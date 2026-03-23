import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useLanguage } from '../context/LanguageContext';
import { LogIn, LogOut, Plus, Trash2, Loader2, ShieldCheck } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { useFirestore } from '../hooks/useFirestore';
import { Notice, Member } from '../types';

const Admin: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(auth.currentUser);

  const { data: notices, loading: noticesLoading } = useFirestore<Notice>('notices');

  const handleSeedData = async () => {
    if (!window.confirm('This will seed the General Body 2025-2026 data. Continue?')) return;
    setLoading(true);
    try {
      const batch = writeBatch(db);
      
      // Add GB Notice
      const noticeRef = doc(collection(db, 'notices'));
      batch.set(noticeRef, {
        titleEn: 'GENERAL BODY FOR THE SESSION 2025 – 2026',
        titleOl: '᱒᱐᱒᱕ – ᱒᱐᱒᱖ ᱥᱮᱥᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱡᱮᱱᱮᱨᱟᱞ ᱵᱚᱰᱤ',
        date: '2025-11-09',
        isImportant: true,
        contentEn: 'All Members are hereby informed that according to our last meeting held on 9th November for the purpose of the new GB member formation was successfully conducted. The new GB members have been elected for the session 2025-2026.',
        contentOl: 'ᱡᱚᱛᱚ ᱥᱚᱦᱮᱫ ᱠᱚ ᱵᱟᱰᱟᱭ ᱚᱪᱚ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱡᱮ ᱙ ᱱᱚᱵᱷᱮᱢᱵᱚᱨ ᱦᱤᱞᱚᱜ ᱦᱩᱭ ᱟᱠᱟᱱ ᱟᱵᱚᱣᱟᱜ ᱢᱩᱪᱟᱹᱫ ᱜᱟᱞᱢᱟᱨᱟᱣ ᱞᱮᱠᱟᱛᱮ ᱱᱟᱣᱟ ᱡᱤ.ᱵᱤ. ᱥᱚᱦᱮᱫ ᱵᱮᱱᱟᱣ ᱠᱟᱹᱢᱤ ᱱᱟᱯᱟᱭ ᱛᱮ ᱥᱟᱹᱛ ᱟᱠᱟᱱᱟ ᱾ ᱒᱐᱒᱕-᱒᱐᱒᱖ ᱥᱮᱥᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱱᱟᱣᱟ ᱡᱤ.ᱵᱤ. ᱥᱚᱦᱮᱫ ᱠᱚ ᱵᱟᱪᱷᱚᱱ ᱟᱠᱟᱱᱟ ᱾',
        createdAt: serverTimestamp()
      });

      // Add GB Members
      const members = [
        { postEn: 'PRESIDENT', postOl: 'ᱯᱟᱨᱥᱮᱛ', nameEn: 'Shakespear Kisku', nameOl: 'ᱥᱮᱠᱥᱯᱤᱭᱚᱨ ᱠᱤᱥᱠᱩ', institution: 'KGEC', contact: '8509909822', order: 1 },
        { postEn: 'VICE-PRESIDENT', postOl: 'ᱩᱯᱚ-ᱯᱟᱨᱥᱮᱛ', nameEn: 'Sandip Hembram', nameOl: 'ᱥᱟᱱᱫᱤᱯ ᱦᱮᱢᱵᱽᱨᱚᱢ', institution: 'MAKAUT', contact: '9832382762', order: 2 },
        { postEn: 'VICE-PRESIDENT (LADIES)', postOl: 'ᱩᱯᱚ-ᱯᱟᱨᱥᱮᱛ (ᱠᱩᱲᱤ)', nameEn: 'Jharna Murmu', nameOl: 'ᱡᱷᱟᱨᱱᱟ ᱢᱩᱨᱢᱩ', institution: 'JGEC', contact: '8509014910', order: 3 },
        { postEn: 'GENERAL SECRETARY', postOl: 'ᱥᱩᱛᱨᱮᱛ', nameEn: 'Srijan Soren', nameOl: 'ᱥᱨᱤᱡᱚᱱ ᱥᱚᱨᱮᱱ', institution: 'IIEST', contact: '9382091267', order: 4 },
        { postEn: 'ASSISTANT GENERAL SECRETARY', postOl: 'ᱜᱚᱲᱚ-ᱥᱩᱛᱨᱮᱛ', nameEn: 'Mulukchand Hansda', nameOl: 'ᱢᱩᱞᱩᱠᱪᱟᱸᱫᱽ ᱦᱟᱸᱥᱫᱟ', institution: 'NIT DGP', contact: '8509141843', order: 5 },
        { postEn: 'ASSISTANT GENERAL SECRETARY (LADIES)', postOl: 'ᱜᱚᱲᱚ-ᱥᱩᱛᱨᱮᱛ (ᱠᱩᱲᱤ)', nameEn: 'Madhabi Soren', nameOl: 'ᱢᱟᱫᱷᱚᱵᱤ ᱥᱚᱨᱮᱱ', institution: 'GCETT-B', contact: '7811886116', order: 6 },
        { postEn: 'TREASURER', postOl: 'ᱠᱟᱹᱣᱰᱤ ᱜᱚᱲᱚᱭᱤᱡ', nameEn: 'Anjali Hembram', nameOl: 'ᱟᱧᱡᱚᱞᱤ ᱦᱮᱢᱵᱽᱨᱚᱢ', institution: 'KGEC', contact: '7586853459', order: 7 },
        { postEn: 'ASSISTANT TREASURER', postOl: 'ᱜᱚᱲᱚ-ᱠᱟᱹᱣᱰᱤ ᱜᱚᱲᱚᱭᱤᱡ', nameEn: 'Serma Tudu', nameOl: 'ᱥᱮᱨᱢᱟ ᱴᱩᱰᱩ', institution: 'GCECT', contact: '7602239788', order: 8 },
        { postEn: 'CULTURAL SECRETARY', postOl: 'ᱞᱟᱠᱪᱟᱨ ᱥᱩᱛᱨᱮᱛ', nameEn: 'Jayanta Hansda', nameOl: 'ᱡᱚᱭᱚᱱᱛᱚ ᱦᱟᱸᱥᱫᱟ', institution: 'RKMGEC', contact: '8597918964', order: 9 },
        { postEn: 'ASSISTANT CULTURAL SECRETARY', postOl: 'ᱜᱚᱲᱚ-ᱞᱟᱠᱪᱟᱨ ᱥᱩᱛᱨᱮᱛ', nameEn: 'Mahadev Tudu', nameOl: 'ᱢᱚᱦᱟᱫᱮᱵᱽ ᱴᱩᱰᱩ', institution: 'JGEC', contact: '8670874153', order: 10 },
      ];

      members.forEach((m) => {
        const memberRef = doc(collection(db, 'members'));
        batch.set(memberRef, {
          nameEn: m.nameEn,
          nameOl: m.nameOl,
          designationEn: m.postEn,
          designationOl: m.postOl,
          roleEn: m.institution,
          roleOl: m.institution,
          contact: m.contact,
          order: m.order,
          photoUrl: `https://picsum.photos/seed/${m.nameEn.split(' ')[0]}/200/200`,
          createdAt: serverTimestamp()
        });
      });

      await batch.commit();
      alert('Data seeded successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Form states for new notice
  const [newNotice, setNewNotice] = useState({
    titleEn: '',
    titleOl: '',
    contentEn: '',
    contentOl: '',
    isImportant: false,
    link: ''
  });

  auth.onAuthStateChanged((u) => setUser(u));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'notices'), {
        ...newNotice,
        date: new Date().toISOString().split('T')[0],
        createdAt: serverTimestamp()
      });
      setNewNotice({ titleEn: '', titleOl: '', contentEn: '', contentOl: '', isImportant: false, link: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      await deleteDoc(doc(db, 'notices', id));
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white border border-gov-border rounded-lg p-8 shadow-md">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <img 
              src="https://res.cloudinary.com/doq1ara3j/image/upload/v1774259612/images_2_-ClRCJwfd_mz8jlg.png" 
              alt="SESWA Logo" 
              className="w-24 h-24 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-2xl font-bold text-gov-blue uppercase tracking-wider">Admin Login</h2>
          <p className="text-sm text-gray-500 mt-2">Authorized Personnel Only</p>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gov-blue">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full border border-gov-border rounded px-4 py-2 focus:outline-none focus:border-gov-blue"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gov-blue">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full border border-gov-border rounded px-4 py-2 focus:outline-none focus:border-gov-blue"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gov-blue text-white py-3 rounded font-bold uppercase tracking-widest hover:bg-gov-accent hover:text-gov-blue transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <LogIn size={18} />} Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center bg-gov-light p-6 rounded border border-gov-border">
        <div>
          <h2 className="text-2xl font-bold text-gov-blue uppercase">Admin Dashboard</h2>
          <p className="text-sm text-gray-600">Logged in as: {user.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSeedData}
            disabled={loading}
            className="bg-gov-accent text-gov-blue px-4 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-gov-blue hover:text-white transition-all flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />} Seed GB 2025-26
          </button>
          <button 
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Add Notice Form */}
        <div className="bg-white border border-gov-border rounded-lg p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gov-blue uppercase mb-6 border-b border-gov-border pb-2">Add New Notice</h3>
          <form onSubmit={handleAddNotice} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                placeholder="Title (English)" 
                value={newNotice.titleEn}
                onChange={(e) => setNewNotice({...newNotice, titleEn: e.target.value})}
                required 
                className="w-full border border-gov-border rounded px-4 py-2"
              />
              <input 
                placeholder="Title (Ol Chiki)" 
                value={newNotice.titleOl}
                onChange={(e) => setNewNotice({...newNotice, titleOl: e.target.value})}
                required 
                className="w-full border border-gov-border rounded px-4 py-2 font-ol"
              />
            </div>
            <textarea 
              placeholder="Content (English)" 
              value={newNotice.contentEn}
              onChange={(e) => setNewNotice({...newNotice, contentEn: e.target.value})}
              required 
              rows={3}
              className="w-full border border-gov-border rounded px-4 py-2"
            />
            <textarea 
              placeholder="Content (Ol Chiki)" 
              value={newNotice.contentOl}
              onChange={(e) => setNewNotice({...newNotice, contentOl: e.target.value})}
              required 
              rows={3}
              className="w-full border border-gov-border rounded px-4 py-2 font-ol"
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-bold text-gov-blue uppercase">
                <input 
                  type="checkbox" 
                  checked={newNotice.isImportant}
                  onChange={(e) => setNewNotice({...newNotice, isImportant: e.target.checked})}
                /> Important
              </label>
              <input 
                placeholder="Link (Optional)" 
                value={newNotice.link}
                onChange={(e) => setNewNotice({...newNotice, link: e.target.value})}
                className="flex-grow border border-gov-border rounded px-4 py-2"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gov-blue text-white py-3 rounded font-bold uppercase tracking-widest hover:bg-gov-accent hover:text-gov-blue transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} Add Notice
            </button>
          </form>
        </div>

        {/* Manage Notices */}
        <div className="bg-white border border-gov-border rounded-lg p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gov-blue uppercase mb-6 border-b border-gov-border pb-2">Manage Notices</h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
            {noticesLoading ? (
              <div className="flex justify-center py-12"><Loader2 className="animate-spin text-gov-blue" /></div>
            ) : notices.map((notice) => (
              <div key={notice.id} className="flex justify-between items-center p-3 bg-gov-light rounded border border-gov-border">
                <div>
                  <h4 className="font-bold text-gov-blue text-sm uppercase">{notice.titleEn}</h4>
                  <p className="text-[10px] text-gray-500">{notice.date}</p>
                </div>
                <button 
                  onClick={() => handleDeleteNotice(notice.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
