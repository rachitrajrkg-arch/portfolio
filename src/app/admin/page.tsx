'use client';

import React, { useState, useEffect } from 'react';
import { CMSStore } from '../../lib/payloadData';
import { DoctorProfile, Service, ClinicLocation, Appointment } from '../../types';
import { Settings, User, Activity, Hospital, Calendar, Save, Plus, Trash2, ArrowLeft, CheckCircle2, Lock, KeyRound, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [profile, setProfile] = useState<DoctorProfile>(CMSStore.getProfile());
  const [services, setServices] = useState<Service[]>(CMSStore.getServices());
  const [clinics, setClinics] = useState<ClinicLocation[]>(CMSStore.getClinics());
  const [appointments, setAppointments] = useState<Appointment[]>(CMSStore.getAppointments());

  const [activeTab, setActiveTab] = useState<'profile' | 'services' | 'clinics' | 'appointments'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuth = sessionStorage.getItem('admin_authenticated');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
    setProfile(CMSStore.getProfile());
    setServices(CMSStore.getServices());
    setClinics(CMSStore.getClinics());
    setAppointments(CMSStore.getAppointments());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'drrachit123' || passcode === 'admin123' || passcode === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Try "drrachit123" or "admin123"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPasscode('');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    CMSStore.saveProfile(profile);
    triggerSuccess();
  };

  const handleSaveServices = () => {
    CMSStore.saveServices(services);
    triggerSuccess();
  };

  const handleSaveClinics = () => {
    CMSStore.saveClinics(clinics);
    triggerSuccess();
  };

  const triggerSuccess = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    CMSStore.updateAppointmentStatus(id, status);
    setAppointments(CMSStore.getAppointments());
    triggerSuccess();
  };

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mx-auto border border-teal-500/20">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Doctor CMS Admin Login</h1>
            <p className="text-xs text-slate-400">Enter your secure passcode to manage portfolio & OPD data</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Admin Passcode</label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. drrachit123)"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-teal-500 outline-none text-xs text-white placeholder-slate-600 font-medium"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
              {authError && (
                <p className="text-xs text-rose-400 font-semibold mt-1">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Unlock Admin Panel</span>
            </button>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-slate-400 hover:text-slate-200 transition-colors">
                ← Back to Doctor Website
              </Link>
            </div>
          </form>
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
                <h1 className="text-lg font-bold text-white tracking-tight">CMS Admin Dashboard</h1>
              </div>
              <p className="text-xs text-slate-400">Dr. Rachit Raj Portfolio & Clinic Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Saved successfully!
              </span>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-colors"
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
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors ${
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
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors ${
              activeTab === 'services'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Activity className="w-4 h-4" />
            Services & Procedures ({services.length})
          </button>

          <button
            onClick={() => setActiveTab('clinics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors ${
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
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors ${
              activeTab === 'appointments'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Appointments ({appointments.length})
          </button>
        </div>

        {/* Tab 1: Profile Editor */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-teal-400" />
              Edit Doctor Credentials
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Doctor Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-xs font-medium text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Specialty Subtitle</label>
                <input
                  type="text"
                  value={profile.titles}
                  onChange={(e) => setProfile({ ...profile, titles: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-xs font-medium text-white"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Primary Phone Number</label>
                <input
                  type="text"
                  value={profile.phonePrimary}
                  onChange={(e) => setProfile({ ...profile, phonePrimary: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-xs font-medium text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">WhatsApp Number</label>
                <input
                  type="text"
                  value={profile.whatsappNumber}
                  onChange={(e) => setProfile({ ...profile, whatsappNumber: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-xs font-medium text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Years Experience</label>
                <input
                  type="number"
                  value={profile.experienceYears}
                  onChange={(e) => setProfile({ ...profile, experienceYears: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-xs font-medium text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Bio Summary</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-xs font-medium text-white"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-colors"
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
              <h2 className="text-lg font-bold text-white">Manage Surgical Specialties</h2>
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors"
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
                      <label className="text-xs font-bold text-slate-400">Short Summary</label>
                      <textarea
                        rows={2}
                        value={serv.shortDesc}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[index].shortDesc = e.target.value;
                          setServices(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400">Procedure Specs</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={serv.procedureTime}
                          onChange={(e) => {
                            const updated = [...services];
                            updated[index].procedureTime = e.target.value;
                            setServices(updated);
                          }}
                          className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
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
                          className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                          placeholder="Recovery"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveServices}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <Save className="w-4 h-4" />
                Save All Services
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Clinics Editor */}
        {activeTab === 'clinics' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Manage Clinic OPD Locations</h2>
            
            <div className="grid gap-6">
              {clinics.map((clinic, idx) => (
                <div key={clinic.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400">Clinic Name</label>
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400">Address</label>
                      <input
                        type="text"
                        value={clinic.address}
                        onChange={(e) => {
                          const updated = [...clinics];
                          updated[idx].address = e.target.value;
                          setClinics(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400">OPD Timings Text</label>
                      <input
                        type="text"
                        value={clinic.timings}
                        onChange={(e) => {
                          const updated = [...clinics];
                          updated[idx].timings = e.target.value;
                          setClinics(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveClinics}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Clinic OPD Timings
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Appointments Manager */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Patient Appointment Records</h2>
            
            {appointments.length === 0 ? (
              <p className="text-slate-400 text-xs">No appointment submissions found yet.</p>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div key={apt.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-white">{apt.patientName}</span>
                        <span className="text-xs font-semibold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                          {apt.phone}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Location: <span className="font-semibold text-white">{apt.clinicId}</span> | Date: <span className="text-teal-300 font-bold">{apt.preferredDate}</span> ({apt.preferredTime})
                      </p>
                      {apt.notes && (
                        <p className="text-[11px] text-slate-400 italic">Notes: "{apt.notes}"</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={apt.status}
                        onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as Appointment['status'])}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white"
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
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors"
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

      </div>
    </div>
  );
}

