'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import {
    collection, addDoc, query, orderBy, getDocs, updateDoc, doc, deleteDoc, writeBatch
} from 'firebase/firestore';
import { storage, db } from '@/utils/firebase';
import Swal from 'sweetalert2';
import {
    UploadCloud, Loader2, Trash2, Pencil, Eye, EyeOff, Move
} from 'lucide-react';
import {
    DndContext, closestCenter, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core';
import {
    SortableContext, useSortable, arrayMove, verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ProtectedRoute from '@/utils/ProtectedRoute';
import Image from 'next/image';
import { DragEndEvent } from '@dnd-kit/core';

type Media = {
    id: string;
    title: string;
    src: string;
    type: 'photo' | 'video';
    visible: boolean;
    position: number;
};

function SortableItem({
    item,
    onToggle,
    onEdit,
    onDelete,
}: {
    item: Media;
    onToggle: (i: Media) => void;
    onEdit: (i: Media) => void;
    onDelete: (i: Media) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm flex items-center p-4 space-x-4 hover:shadow-md transition-shadow"
        >
            <div
                className="absolute top-2 left-2 p-1 cursor-grab text-zinc-500 hover:text-cyan-500"
                {...attributes}
                {...listeners}
            >
                <Move size={20} />
            </div>
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-zinc-800">
                {item.type === 'photo' ? (
                    <Image src={item.src} alt={item.title} className="object-cover w-full h-full" />
                ) : (
                    <video src={item.src} muted loop className="object-cover w-full h-full" />
                )}
            </div>
            <div className="flex-1">
                <div className="font-medium text-white text-lg">{item.title}</div>
                <div className="text-sm text-zinc-400">Visible: {item.visible ? 'Yes' : 'No'}</div>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={() => onToggle(item)}
                    className="p-2 rounded hover:bg-zinc-800 transition cursor-pointer text-zinc-400 hover:text-cyan-500"
                >
                    {item.visible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <button
                    onClick={() => onEdit(item)}
                    className="p-2 rounded hover:bg-zinc-800 transition cursor-pointer text-zinc-400 hover:text-yellow-400"
                >
                    <Pencil size={20} />
                </button>
                <button
                    onClick={() => onDelete(item)}
                    className="p-2 rounded hover:bg-zinc-800 transition cursor-pointer text-zinc-400 hover:text-red-500"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
}

export default function AdminPage() {
    const [tab, setTab] = useState<'photo' | 'video'>('photo');
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [uploading, setUploading] = useState(false);
    const [media, setMedia] = useState<Media[]>([]);
    const [editing, setEditing] = useState<{ id: string; title: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const sensors = useSensors(useSensor(PointerSensor));
    const [progress, setProgress] = useState(0);
    const [emojiBar, setEmojiBar] = useState('');
    const emojis = ['🦄', '🪩', '🍕', '🐸', '🤹‍♀️', '👾', '🎯', '🧃', '🍉', '🧁'];



    useEffect(() => {
        loadMedia();
    }, [tab]);


    const loadMedia = async () => {
        const q = query(collection(db, tab), orderBy('position'));
        const snap = await getDocs(q);
        setMedia(snap.docs.map(d => ({ ...(d.data() as Omit<Media, 'id'>), id: d.id })));
    };

    const upload = async () => {
        if (uploading) return;

        if (!file || !title) {
            return Swal.fire('Missing info', 'Provide file & title', 'warning');
        }

        setUploading(true);
        setProgress(0);
        setEmojiBar('⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛');

        Swal.fire({
            title: 'Uploading...',
            html: `
            <div id="emoji-progress" style="font-size: 1.5rem; margin-bottom: 0.5rem;">⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛</div>
            <div id="percent-text" style="font-size: 0.9rem; color: #aaa;">0% — Sending digital magic...</div>
        `,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        try {
            const storageRef = ref(storage, `aryan/${tab}/${file.name}`);
            const task = uploadBytesResumable(storageRef, file);
            const emojiBase = [...emojis];

            task.on(
                'state_changed',
                snapshot => {
                    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(percent);

                    const totalBars = 10;
                    const filled = Math.round((percent / 100) * totalBars);
                    const bar = emojiBase.slice(0, filled).join('') + '⬛'.repeat(totalBars - filled);
                    setEmojiBar(bar);

                    const emojiDiv = Swal.getHtmlContainer()?.querySelector('#emoji-progress');
                    const textDiv = Swal.getHtmlContainer()?.querySelector('#percent-text');
                    if (emojiDiv) emojiDiv.textContent = bar;
                    if (textDiv) textDiv.textContent = `${percent.toFixed(0)}% — Sending digital magic...`;
                },
                error => {
                    console.error('Upload error:', error);
                    Swal.fire('Upload Error', (error as Error).message, 'error');
                    setUploading(false);
                    setProgress(0);
                    setEmojiBar('');
                },
                async () => {
                    const url = await getDownloadURL(task.snapshot.ref);
                    const pos = media.length ? Math.max(...media.map(m => m.position)) + 1 : 0;

                    const docRef = await addDoc(collection(db, tab), {
                        title,
                        src: url,
                        type: tab,
                        visible: true,
                        position: pos,
                    });

                    setMedia([
                        ...media,
                        {
                            id: docRef.id,
                            title,
                            src: url,
                            type: tab,
                            visible: true,
                            position: pos,
                        },
                    ]);

                    Swal.fire('Uploaded! 🎉', 'Your masterpiece is online.', 'success');

                    if (fileInputRef.current) fileInputRef.current.value = '';
                    setFile(null);
                    setTitle('');
                    setProgress(0);
                    setEmojiBar('');
                    setUploading(false);
                }
            );
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            Swal.fire('Upload Failed', message, 'error');
            setUploading(false);
            setProgress(0);
            setEmojiBar('');
        }
    };


    const toggle = async (item: Media) => {
        await updateDoc(doc(db, tab, item.id), { visible: !item.visible });
        setMedia(m => m.map(x => x.id === item.id ? { ...x, visible: !x.visible } : x));
    };

    const startEdit = (item: Media) => setEditing({ id: item.id, title: item.title });
    const saveEdit = async () => {
        if (!editing) return;
        await updateDoc(doc(db, tab, editing.id), { title: editing.title });
        setMedia(m => m.map(x => x.id === editing.id ? { ...x, title: editing.title } : x));
        setEditing(null);
        Swal.fire('Updated title!', '', 'success');
    };

    const remove = async (item: Media) => {
        const res = await Swal.fire({
            title: 'Delete this item?',
            text: 'This cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
        });

        if (res.isConfirmed) {
            try {
                // 1. Delete Firestore document
                await deleteDoc(doc(db, tab, item.id));

                // 2. Delete file from Firebase Storage
                const srcPath = decodeURIComponent(new URL(item.src).pathname);
                const fileName = srcPath.split('/').pop();
                if (fileName) {
                    const fileRef = ref(storage, `aryan/${tab}/${fileName}`);
                    await deleteObject(fileRef);
                }

                // 3. Success message and refetch media
                Swal.fire('Deleted!', '', 'success');
                await loadMedia();

            } catch (err) {
                Swal.fire('Error', (err as Error).message, 'error');
            }
        }
    };



    const dragEnd = async (e: DragEndEvent) => {
        const oldIndex = media.findIndex(m => m.id === e.active.id);
        const newIndex = media.findIndex(m => m.id === e.over?.id); // Optional chaining because `e.over` can be null

        if (oldIndex < 0 || newIndex < 0) return;

        const reordered = arrayMove(media, oldIndex, newIndex);
        setMedia(reordered);

        const batch = writeBatch(db);
        reordered.forEach((m, i) => {
            batch.update(doc(db, tab, m.id), { position: i });
        });

        await batch.commit();
    };

    return (
        <ProtectedRoute>
            <div className="p-8 bg-zinc-950 min-h-screen text-white">
                {/* Tabs */}
                <div className="mb-6 flex space-x-4">
                    {(['photo', 'video'] as const).map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-4 py-2 font-medium rounded-xl transition ${tab === t ? 'bg-cyan-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                }`}
                        >
                            {t.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Upload form */}
                <div className="bg-zinc-900 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6">
                    <input
                        type="file"
                        ref={fileInputRef}

                        onChange={e => setFile(e.target.files?.[0] ?? null)}
                        className="text-white file:bg-zinc-700 file:border-none file:rounded-lg file:px-4 file:py-2"
                    />
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Title"
                        className="p-3 rounded-xl border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-400"
                    />
                    <button
                        onClick={upload}
                        disabled={uploading}
                        className={`flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl ${uploading ? 'bg-zinc-700' : 'bg-cyan-600 hover:bg-cyan-700'
                            }`}
                    >
                        {uploading ? <Loader2 className="animate-spin" size={20} /> : <UploadCloud size={20} />}
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                    {uploading && (
                        <div className="col-span-3 text-center mt-2">
                            <div className="bg-zinc-800 rounded-xl py-4 px-6 border border-zinc-700 shadow-inner">
                                <div className="text-2xl font-mono tracking-widest mb-1">
                                    {emojiBar || '⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛'}
                                </div>
                                <div className="text-sm text-zinc-300">
                                    {progress.toFixed(0)}% — Sending digital magic...
                                </div>
                            </div>
                        </div>
                    )}


                </div>

                {/* Edit Modal */}
                {editing && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-white text-black rounded-xl p-6 w-full max-w-sm shadow-lg">
                            <h3 className="mb-4 font-semibold text-lg">Edit Title</h3>
                            <input
                                value={editing.title}
                                onChange={e => setEditing({ ...editing, title: e.target.value })}
                                className="w-full p-2 border border-zinc-300 rounded-lg mb-4"
                            />
                            <div className="flex justify-end space-x-2">
                                <button onClick={() => setEditing(null)} className="px-4 py-2 text-zinc-600">Cancel</button>
                                <button onClick={saveEdit} className="px-4 py-2 bg-cyan-600 text-white rounded-lg">Save</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Media List with Drag Sort */}
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={dragEnd}>
                    <SortableContext items={media.map(m => m.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-4">
                            {media.map(item => (
                                <SortableItem
                                    key={item.id}
                                    item={item}
                                    onToggle={toggle}
                                    onEdit={startEdit}
                                    onDelete={remove}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </ProtectedRoute>
    );
}
