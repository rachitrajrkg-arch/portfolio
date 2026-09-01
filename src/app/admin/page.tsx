'use client';

import React, { useState, useEffect } from 'react';
import {
  CMSStore,
  GOOGLE_REVIEWS_URL,
  INITIAL_DOCTOR_PROFILE,
  INITIAL_SERVICES,
  INITIAL_CLINICS,
  INITIAL_TESTIMONIALS,
  INITIAL_DOCTOR_GALLERY,
  INITIAL_CLINIC_GALLERY,
} from '../../lib/payloadData';
import { DoctorProfile, Service, ClinicLocation, Appointment, Testimonial, GalleryImage } from '../../types';
import { Settings, User, Activity, Hospital, Calendar, Save, Plus, Trash2, ArrowLeft, CheckCircle2, Lock, KeyRound, LogOut, Images, Star, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const SERVICE_CATEGORIES: Service['category'][] = ['Robotic Surgery', 'Laparoscopic Surgery', 'Laser Proctology', 'General Surgery', 'General Care', 'Emergency Care'];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [loginView, setLoginView] = useState<'login' | 'changePassword'>('login');

  const [profile, setProfile] = useState<DoctorProfile>(INITIAL_DOCTOR_PROFILE);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [clinics, setClinics] = useState<ClinicLocation[]>(INITIAL_CLINICS);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [doctorGallery, setDoctorGallery] = useState<GalleryImage[]>(INITIAL_DOCTOR_GALLERY);
  const [clinicGallery, setClinicGallery] = useState<GalleryImage[]>(INITIAL_CLINIC_GALLERY);

  const [currentPasscode, setCurrentPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const [activeTab, setActiveTab] = useState<'profile' | 'services' | 'gallery' | 'clinics' | 'reviews' | 'appointments' | 'settings'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/admin/session')
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(!!data.authenticated));

    CMSStore.getProfile().then(setProfile);
    CMSStore.getServices().then(setServices);
    CMSStore.getClinics().then(setClinics);
    CMSStore.getAppointments().then(setAppointments);
    CMSStore.getTestimonials().then(setTestimonials);
    CMSStore.getDoctorGallery().then(setDoctorGallery);
    CMSStore.getClinicGallery().then(setClinicGallery);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode }),
    });
    if (res.ok) {
      setIsAuthenticated(true);
      setAuthError('');
      CMSStore.getAppointments().then(setAppointments);
    } else {
      const data = await res.json().catch(() => ({}));
      setAuthError(data.error || 'Incorrect passcode. Please try again.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setPasscode('');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await CMSStore.saveProfile(profile);
    triggerSuccess();
  };

  const handleSaveServices = async () => {
    await CMSStore.saveServices(services);
    triggerSuccess();
  };

  const handleSaveClinics = async () => {
    await CMSStore.saveClinics(clinics);
    triggerSuccess();
  };

  const handleSaveTestimonials = async () => {
    await CMSStore.saveTestimonials(testimonials);
    triggerSuccess();
  };

  const handleSaveDoctorGallery = async () => {
    await CMSStore.saveDoctorGallery(doctorGallery);
    triggerSuccess();
  };

  const handleSaveClinicGallery = async () => {
    await CMSStore.saveClinicGallery(clinicGallery);
    triggerSuccess();
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPasscode !== confirmPasscode) {
      setPasswordError('New passcode and confirmation do not match.');
      return;
    }

    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPasscode, newPasscode }),
    });

    if (res.ok) {
      setPasswordSuccess('Passcode updated. Use it next time you log in.');
      setCurrentPasscode('');
      setNewPasscode('');
      setConfirmPasscode('');
    } else {
      const data = await res.json().catch(() => ({}));
      setPasswordError(data.error || 'Could not update passcode.');
    }
  };

  const setClinicPrimary = (id: string) => {
    setClinics(clinics.map((c) => ({ ...c, isPrimary: c.id === id })));
  };

  const triggerSuccess = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    await CMSStore.updateAppointmentStatus(id, status);
    setAppointments(await CMSStore.getAppointments());
    triggerSuccess();
  };

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mx-auto border border-teal-500/20">
              {loginView === 'login' ? <Lock className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
            </div>
            <h1 className="text-2xl font-sans font-bold text-white tracking-tight">
              {loginView === 'login' ? 'Doctor CMS Admin Login' : 'Change Admin Passcode'}
            </h1>
            <p className="text-sm text-slate-400">
              {loginView === 'login'
                ? 'Enter your secure passcode to manage portfolio & OPD data'
                : 'Enter your current passcode and choose a new one'}
            </p>
          </div>

          {loginView === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-300">Admin Passcode</label>
                <div className="relative">
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter admin passcode"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-teal-500 outline-none text-sm text-white placeholder-slate-600 font-medium"
                  />
                  <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
                </div>
                {authError && (
                  <p className="text-sm text-rose-400 font-semibold mt-1">{authError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Unlock Admin Panel</span>
              </button>

              <div className="text-center pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => { setLoginView('changePassword'); setAuthError(''); setPasswordError(''); setPasswordSuccess(''); }}
                  className="block w-full text-sm text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Change Admin Passcode
                </button>
                {/* <Link href="/" className="block text-sm text-slate-400 hover:text-slate-200 transition-colors">
                  ← Back to Doctor Website
                </Link> */}
              </div>
            </form>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-300">Current Passcode</label>
                <input
                  type="password"
                  value={currentPasscode}
                  onChange={(e) => setCurrentPasscode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-teal-500 outline-none text-sm font-medium text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-300">New Passcode</label>
                <input
                  type="password"
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-teal-500 outline-none text-sm font-medium text-white placeholder-slate-600"
                  minLength={6}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-300">Confirm New Passcode</label>
                <input
                  type="password"
                  value={confirmPasscode}
                  onChange={(e) => setConfirmPasscode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-teal-500 outline-none text-sm font-medium text-white"
                  minLength={6}
                  required
                />
              </div>

              {passwordError && (
                <p className="text-sm text-rose-400 font-semibold">{passwordError}</p>
              )}
              {passwordSuccess && (
                <p className="text-sm text-emerald-400 font-semibold">{passwordSuccess}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Update Passcode</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setLoginView('login'); setPasswordError(''); setPasswordSuccess(''); }}
                  className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      {/* Top Header */}
      <header className="bg-slate-950 border-b border-slate-800 py-4 px-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="Return to home page"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-teal-400" />
                <h1 className="text-xl font-sans font-bold text-white tracking-tight">CMS Admin Dashboard</h1>
              </div>
              <p className="text-sm text-slate-400">Dr. Rachit Raj Portfolio & Clinic Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-sm font-bold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Saved successfully!
              </span>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold border border-slate-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-colors"
            >
              View Live Website
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              activeTab === 'profile'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <User className="w-4 h-4" />
            Doctor Profile
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              activeTab === 'services'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Activity className="w-4 h-4" />
            Surgical Specialties ({services.length})
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              activeTab === 'gallery'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Images className="w-4 h-4" />
            Gallery ({doctorGallery.length + clinicGallery.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              activeTab === 'reviews'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Star className="w-4 h-4" />
            Patient Reviews ({testimonials.length})
          </button>

          <button
            onClick={() => setActiveTab('clinics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              activeTab === 'clinics'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Hospital className="w-4 h-4" />
            Clinics & OPD ({clinics.length})
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              activeTab === 'appointments'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Appointments ({appointments.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              activeTab === 'settings'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Settings
          </button>
        </div>

        {/* Tab 1: Profile Editor */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-xl font-sans font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-teal-400" />
              Edit Doctor Credentials
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-300">Doctor Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-300">Clinic Name</label>
                <input
                  type="text"
                  value={profile.clinicName}
                  onChange={(e) => setProfile({ ...profile, clinicName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-300">Specialty Subtitle</label>
              <input
                type="text"
                value={profile.titles}
                onChange={(e) => setProfile({ ...profile, titles: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-300">Call / WhatsApp / Booking Number</label>
                <input
                  type="text"
                  value={profile.phonePrimary}
                  onChange={(e) => setProfile({ ...profile, phonePrimary: e.target.value, whatsappNumber: e.target.value, emergencyContact: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white"
                />
                <p className="text-sm text-slate-500">Used for calls, WhatsApp chat and appointment booking.</p>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-300">Years Experience</label>
                <input
                  type="number"
                  value={profile.experienceYears}
                  onChange={(e) => setProfile({ ...profile, experienceYears: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-300">Surgeries Performed</label>
                <input
                  type="number"
                  value={profile.surgeriesCount}
                  onChange={(e) => setProfile({ ...profile, surgeriesCount: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-300">Doctor Photo URL</label>
                <input
                  type="text"
                  value={profile.avatarUrl}
                  onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-300">Clinic Logo URL (optional)</label>
                <input
                  type="text"
                  placeholder="https://... leave blank to use the RLC monogram"
                  value={profile.logoUrl}
                  onChange={(e) => setProfile({ ...profile, logoUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white placeholder-slate-600"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-300">Bio Summary (shown in Hero section)</label>
              <textarea
                rows={2}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-300">About the Doctor (full bio)</label>
              <textarea
                rows={4}
                value={profile.longBio}
                onChange={(e) => setProfile({ ...profile, longBio: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-300">Degrees & Qualifications</label>
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, degrees: [...profile.degrees, "New Qualification"] })}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Qualification
                </button>
              </div>
              <div className="space-y-2">
                {profile.degrees.map((degree, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => {
                        const updated = [...profile.degrees];
                        updated[i] = e.target.value;
                        setProfile({ ...profile, degrees: updated });
                      }}
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                    />
                    <button
                      type="button"
                      onClick={() => setProfile({ ...profile, degrees: profile.degrees.filter((_, di) => di !== i) })}
                      className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Profile Changes
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Services Editor */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-sans font-bold text-white">Manage Surgical Specialties</h2>
              <button
                onClick={() => {
                  const newService: Service = {
                    id: `service-${Date.now()}`,
                    slug: `new-service-${Date.now()}`,
                    title: "New Procedure Title",
                    category: "Laser Proctology",
                    shortDesc: "Short summary of procedure...",
                    fullDesc: "Detailed description...",
                    symptoms: ["Symptom 1"],
                    benefits: ["Benefit 1"],
                    procedureTime: "30 Minutes",
                    recoveryTime: "1 Day",
                    iconName: "Zap"
                  };
                  setServices([...services, newService]);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Procedure
              </button>
            </div>

            <div className="grid gap-6">
              {services.map((serv, index) => (
                <div key={serv.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="text"
                      value={serv.title}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[index].title = e.target.value;
                        setServices(updated);
                      }}
                      className="text-base font-bold bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 text-white w-full max-w-md"
                    />
                    <button
                      onClick={() => setServices(services.filter(s => s.id !== serv.id))}
                      className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">Short Summary</label>
                      <textarea
                        rows={2}
                        value={serv.shortDesc}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[index].shortDesc = e.target.value;
                          setServices(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">Category</label>
                      <select
                        value={serv.category}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[index].category = e.target.value as Service['category'];
                          setServices(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                      >
                        {SERVICE_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>

                      <label className="text-sm font-bold text-slate-400 pt-1 block">Procedure Specs</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={serv.procedureTime}
                          onChange={(e) => {
                            const updated = [...services];
                            updated[index].procedureTime = e.target.value;
                            setServices(updated);
                          }}
                          className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                          placeholder="Time"
                        />
                        <input
                          type="text"
                          value={serv.recoveryTime}
                          onChange={(e) => {
                            const updated = [...services];
                            updated[index].recoveryTime = e.target.value;
                            setServices(updated);
                          }}
                          className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                          placeholder="Recovery"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-400">Image URL</label>
                    <div className="flex items-center gap-3">
                      {serv.imageUrl && (
                        <img src={serv.imageUrl} alt="" className="w-14 h-14 rounded-lg object-cover border border-slate-700 shrink-0" />
                      )}
                      <input
                        type="text"
                        value={serv.imageUrl || ''}
                        placeholder="https://..."
                        onChange={(e) => {
                          const updated = [...services];
                          updated[index].imageUrl = e.target.value;
                          setServices(updated);
                        }}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder-slate-600"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveServices}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-colors"
              >
                <Save className="w-4 h-4" />
                Save All Services
              </button>
            </div>
          </div>
        )}

        {/* Tab: Gallery Editor */}
        {activeTab === 'gallery' && (
          <div className="space-y-12">

            {/* Doctor Gallery */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-sans font-bold text-white">Doctor Gallery</h2>
                  <p className="text-sm text-slate-400 mt-0.5">Shown below the "About the Doctor" section.</p>
                </div>
                <button
                  onClick={() => setDoctorGallery([...doctorGallery, { id: `doctor-gallery-${Date.now()}`, url: '', caption: 'Dr. Rachit\'s Laser & Laparoscopy Clinic' }])}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Image
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctorGallery.map((img, index) => (
                  <div key={img.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-3">
                    <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-700">
                      {img.url && <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />}
                    </div>
                    <input
                      type="text"
                      value={img.url}
                      placeholder="Image URL (https://...)"
                      onChange={(e) => {
                        const updated = [...doctorGallery];
                        updated[index].url = e.target.value;
                        setDoctorGallery(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder-slate-600"
                    />
                    <input
                      type="text"
                      value={img.caption}
                      placeholder="Caption"
                      onChange={(e) => {
                        const updated = [...doctorGallery];
                        updated[index].caption = e.target.value;
                        setDoctorGallery(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder-slate-600"
                    />
                    <button
                      onClick={() => setDoctorGallery(doctorGallery.filter((g) => g.id !== img.id))}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 text-sm font-bold transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveDoctorGallery}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Doctor Gallery
                </button>
              </div>
            </div>

            {/* Clinic Gallery */}
            <div className="space-y-6 pt-8 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-sans font-bold text-white">Clinic Gallery</h2>
                  <p className="text-sm text-slate-400 mt-0.5">Shown below the Primary Clinic in the Clinics &amp; OPD section.</p>
                </div>
                <button
                  onClick={() => setClinicGallery([...clinicGallery, { id: `clinic-gallery-${Date.now()}`, url: '', caption: 'Dr. Rachit\'s Laser & Laparoscopy Clinic' }])}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Image
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicGallery.map((img, index) => (
                  <div key={img.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-3">
                    <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-700">
                      {img.url && <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />}
                    </div>
                    <input
                      type="text"
                      value={img.url}
                      placeholder="Image URL (https://...)"
                      onChange={(e) => {
                        const updated = [...clinicGallery];
                        updated[index].url = e.target.value;
                        setClinicGallery(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder-slate-600"
                    />
                    <input
                      type="text"
                      value={img.caption}
                      placeholder="Caption"
                      onChange={(e) => {
                        const updated = [...clinicGallery];
                        updated[index].caption = e.target.value;
                        setClinicGallery(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder-slate-600"
                    />
                    <button
                      onClick={() => setClinicGallery(clinicGallery.filter((g) => g.id !== img.id))}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 text-sm font-bold transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveClinicGallery}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Clinic Gallery
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Clinics Editor */}
        {activeTab === 'clinics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-sans font-bold text-white">Manage Clinic &amp; OPD Locations</h2>
              <button
                onClick={() => {
                  const newClinic: ClinicLocation = {
                    id: `clinic-${Date.now()}`,
                    name: "New Clinic",
                    tagline: "",
                    address: "",
                    area: "",
                    city: "Lucknow, UP",
                    timings: "10:00 AM - 2:00 PM | 5:00 PM - 8:00 PM",
                    days: "Monday to Saturday",
                    phone: profile.phonePrimary,
                    whatsapp: profile.whatsappNumber,
                    mapEmbedUrl: "",
                    directionsUrl: "",
                    imageUrl: "",
                    isPrimary: clinics.length === 0
                  };
                  setClinics([...clinics, newClinic]);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Clinic
              </button>
            </div>

            <div className="grid gap-6">
              {clinics.map((clinic, idx) => (
                <div key={clinic.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <label className="text-sm font-bold text-slate-400">Clinic Name</label>
                      <input
                        type="text"
                        value={clinic.name}
                        onChange={(e) => {
                          const updated = [...clinics];
                          updated[idx].name = e.target.value;
                          setClinics(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm font-bold text-white"
                      />
                    </div>
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-300 shrink-0 pt-4">
                      <input
                        type="radio"
                        name="primaryClinic"
                        checked={!!clinic.isPrimary}
                        onChange={() => setClinicPrimary(clinic.id)}
                        className="w-4 h-4 accent-teal-500"
                      />
                      Primary Clinic
                    </label>
                    <button
                      onClick={() => setClinics(clinics.filter((c) => c.id !== clinic.id))}
                      className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 transition-colors shrink-0 mt-4"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-400">Tagline</label>
                    <input
                      type="text"
                      value={clinic.tagline}
                      onChange={(e) => {
                        const updated = [...clinics];
                        updated[idx].tagline = e.target.value;
                        setClinics(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-sm font-bold text-slate-400">Street Address</label>
                      <input
                        type="text"
                        value={clinic.address}
                        onChange={(e) => {
                          const updated = [...clinics];
                          updated[idx].address = e.target.value;
                          setClinics(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">City / Pincode</label>
                      <input
                        type="text"
                        value={clinic.city}
                        onChange={(e) => {
                          const updated = [...clinics];
                          updated[idx].city = e.target.value;
                          setClinics(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">Area</label>
                      <input
                        type="text"
                        value={clinic.area}
                        onChange={(e) => {
                          const updated = [...clinics];
                          updated[idx].area = e.target.value;
                          setClinics(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">Days Open</label>
                      <input
                        type="text"
                        value={clinic.days}
                        onChange={(e) => {
                          const updated = [...clinics];
                          updated[idx].days = e.target.value;
                          setClinics(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">OPD Timings (Mon–Sat)</label>
                      <input
                        type="text"
                        value={clinic.timings}
                        onChange={(e) => {
                          const updated = [...clinics];
                          updated[idx].timings = e.target.value;
                          setClinics(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">Sunday Timings</label>
                      <input
                        type="text"
                        value={clinic.sundayTimings || ''}
                        placeholder="e.g. Closed, or Prior Appointment Only"
                        onChange={(e) => {
                          const updated = [...clinics];
                          updated[idx].sundayTimings = e.target.value;
                          setClinics(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder-slate-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">Call / WhatsApp Number</label>
                      <input
                        type="text"
                        value={clinic.phone}
                        onChange={(e) => {
                          const updated = [...clinics];
                          updated[idx].phone = e.target.value;
                          updated[idx].whatsapp = e.target.value;
                          setClinics(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">Photo URL</label>
                      <input
                        type="text"
                        value={clinic.imageUrl || ''}
                        placeholder="https://..."
                        onChange={(e) => {
                          const updated = [...clinics];
                          updated[idx].imageUrl = e.target.value;
                          setClinics(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder-slate-600"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">Map Location (Google Maps embed link)</label>
                      <input
                        type="text"
                        value={clinic.mapEmbedUrl}
                        placeholder="https://www.google.com/maps?q=...&output=embed"
                        onChange={(e) => {
                          const updated = [...clinics];
                          updated[idx].mapEmbedUrl = e.target.value;
                          setClinics(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder-slate-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">Get Directions Link</label>
                      <input
                        type="text"
                        value={clinic.directionsUrl}
                        placeholder="https://maps.app.goo.gl/..."
                        onChange={(e) => {
                          const updated = [...clinics];
                          updated[idx].directionsUrl = e.target.value;
                          setClinics(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder-slate-600"
                      />
                    </div>
                  </div>

                  {clinic.mapEmbedUrl && (
                    <div className="h-40 rounded-lg overflow-hidden border border-slate-700">
                      <iframe title={`Map preview ${clinic.name}`} src={clinic.mapEmbedUrl} className="w-full h-full border-0" loading="lazy" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveClinics}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Clinic &amp; OPD Details
              </button>
            </div>
          </div>
        )}

        {/* Tab: Reviews Editor */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-sans font-bold text-white">Manage Patient Reviews</h2>
              <div className="flex items-center gap-2">
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Google Reviews
                </a>
                <button
                  onClick={() => {
                    const newReview: Testimonial = {
                      id: `review-${Date.now()}`,
                      patientName: "Patient Name",
                      procedure: "Procedure",
                      rating: 5,
                      comment: "",
                      date: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
                      verified: true
                    };
                    setTestimonials([newReview, ...testimonials]);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Review
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {testimonials.map((t, index) => (
                <div key={t.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">Patient Name</label>
                      <input
                        type="text"
                        value={t.patientName}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[index].patientName = e.target.value;
                          setTestimonials(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm font-bold text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">Procedure</label>
                      <input
                        type="text"
                        value={t.procedure}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[index].procedure = e.target.value;
                          setTestimonials(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-400">Review Comment</label>
                    <textarea
                      rows={2}
                      value={t.comment}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[index].comment = e.target.value;
                        setTestimonials(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                    />
                  </div>

                  <div className="grid sm:grid-cols-4 gap-4 items-end">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">Rating</label>
                      <select
                        value={t.rating}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[index].rating = Number(e.target.value);
                          setTestimonials(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                      >
                        {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-400">Date</label>
                      <input
                        type="text"
                        value={t.date}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[index].date = e.target.value;
                          setTestimonials(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-sm font-bold text-slate-300 pb-2">
                      <input
                        type="checkbox"
                        checked={t.verified}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[index].verified = e.target.checked;
                          setTestimonials(updated);
                        }}
                        className="w-4 h-4 accent-teal-500"
                      />
                      Verified Patient
                    </label>

                    <button
                      onClick={() => setTestimonials(testimonials.filter((rv) => rv.id !== t.id))}
                      className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 text-sm font-bold transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveTestimonials}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Reviews
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Appointments Manager */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <h2 className="text-xl font-sans font-bold text-white">Patient Appointment Records</h2>
            
            {appointments.length === 0 ? (
              <p className="text-slate-400 text-sm">No appointment submissions found yet.</p>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div key={apt.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-white">{apt.patientName}</span>
                        <span className="text-sm font-semibold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                          {apt.phone}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300">
                        Location: <span className="font-semibold text-white">{apt.clinicId}</span> | Date: <span className="text-teal-300 font-bold">{apt.preferredDate}</span> ({apt.preferredTime})
                      </p>
                      {apt.notes && (
                        <p className="text-sm text-slate-400 italic">Notes: "{apt.notes}"</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={apt.status}
                        onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as Appointment['status'])}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-sm font-bold text-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <a
                        href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${apt.patientName}, this is regarding your appointment with Dr. Rachit Raj.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Settings */}
        {activeTab === 'settings' && (
          <div className="max-w-lg bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-xl font-sans font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
              Change Admin Passcode
            </h2>
            <p className="text-sm text-slate-400 -mt-4">
              Update the passcode used to log into this dashboard. You'll need it the next time you sign in.
            </p>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-300">Current Passcode</label>
                <input
                  type="password"
                  value={currentPasscode}
                  onChange={(e) => setCurrentPasscode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-300">New Passcode</label>
                <input
                  type="password"
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white placeholder-slate-600"
                  minLength={6}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-300">Confirm New Passcode</label>
                <input
                  type="password"
                  value={confirmPasscode}
                  onChange={(e) => setConfirmPasscode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white"
                  minLength={6}
                  required
                />
              </div>

              {passwordError && (
                <p className="text-sm text-rose-400 font-semibold">{passwordError}</p>
              )}
              {passwordSuccess && (
                <p className="text-sm text-emerald-400 font-semibold">{passwordSuccess}</p>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Update Passcode
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

