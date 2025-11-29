import React, { useState, useEffect } from 'react';
import { 
  Truck, User, MapPin, Plus, CheckCircle, Clock, Search, X,
  LayoutDashboard, List, Settings, AlertCircle, Navigation,
  Trash2, Route as RouteIcon, Bell, Download, History, Edit2
} from 'lucide-react';

// --- DATA ---
const INITIAL_DRIVERS = [
  { id: 'd1', name: 'Carrillo', license: 'CDL-A', status: 'available', avatar: 'CA' },
  { id: 'd2', name: 'Delgadillo', license: 'CDL-A', status: 'available', avatar: 'DE' },
  { id: 'd3', name: 'Ochoa', license: 'CDL-A', status: 'available', avatar: 'OC' },
  { id: 'd4', name: 'Vazquez', license: 'CDL-A', status: 'available', avatar: 'VA' },
  { id: 'd5', name: 'Figueroa', license: 'CDL-A', status: 'available', avatar: 'FI' },
];

const INITIAL_TRUCKS = [
  { id: 't1', plate: '4113', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't2', plate: '427', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't3', plate: '1046', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4', plate: '1047', type: 'Truck', status: 'available', capacity: 'Standard' },
];

const INITIAL_ROUTES = [
  { id: 'r1', name: 'West 1', distance: 'Local', estTime: '8h' },
  { id: 'r2', name: 'West 2', distance: 'Local', estTime: '8h' },
  { id: 'r3', name: 'GY/Route', distance: 'Regional', estTime: '10h' },
];

const SHIFTS = ['Morning', 'Afternoon', 'Night'];

export default function FleetApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [trucks, setTrucks] = useState(INITIAL_TRUCKS);
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  
  const [assignments, setAssignments] = useState([]);
  const [history, setHistory] = useState([]);
  
  // Modals & UI State
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalType, setAddModalType] = useState('truck'); 
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null); 

  // Forms
  const [newAssignment, setNewAssignment] = useState({ driverId: '', truckId: '', routeId: '', shift: SHIFTS[0] });
  const [newResource, setNewResource] = useState({ name: '', plate: '', type: '', capacity: 'Medium', distance: '', estTime: '', license: '' });

  // --- LOADING DATA ---
  useEffect(() => {
    const savedAssignments = localStorage.getItem('fleet_assignments_v4');
    const savedHistory = localStorage.getItem('fleet_history_v4');
    const savedTrucks = localStorage.getItem('fleet_trucks_v4');
    const savedRoutes = localStorage.getItem('fleet_routes_v4');
    const savedDrivers = localStorage.getItem('fleet_drivers_v4');
    
    if (savedTrucks) setTrucks(JSON.parse(savedTrucks));
    if (savedRoutes) setRoutes(JSON.parse(savedRoutes));
    if (savedDrivers) setDrivers(JSON.parse(savedDrivers));
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    let currentAssignments = [];
    if (savedAssignments) currentAssignments = JSON.parse(savedAssignments);

    // Auto-archive logic (24h)
    const now = new Date();
    const kept = [];
    const archived = [];
    const freeRes = { drivers: [], trucks: [] };

    currentAssignments.forEach(a => {
        if ((now - new Date(a.startTime)) / 36e5 >= 24) {
            archived.push({ ...a, completedAt: now.toISOString(), status: 'Auto-Completed' });
            freeRes.drivers.push(a.driverId);
            freeRes.trucks.push(a.truckId);
        } else kept.push(a);
    });

    if (archived.length > 0) {
        setAssignments(kept);
        setHistory(prev => [...archived, ...prev]);
        setDrivers(prev => prev.map(d => freeRes.drivers.includes(d.id) ? { ...d, status: 'available' } : d));
        setTrucks(prev => prev.map(t => freeRes.trucks.includes(t.id) ? { ...t, status: 'available' } : t));
    } else {
        setAssignments(currentAssignments);
    }
  }, []);

  // --- SAVING DATA ---
  useEffect(() => { localStorage.setItem('fleet_assignments_v4', JSON.stringify(assignments)); }, [assignments]);
  useEffect(() => { localStorage.setItem('fleet_history_v4', JSON.stringify(history)); }, [history]);
  useEffect(() => { localStorage.setItem('fleet_trucks_v4', JSON.stringify(trucks)); }, [trucks]);
  useEffect(() => { localStorage.setItem('fleet_routes_v4', JSON.stringify(routes)); }, [routes]);
  useEffect(() => { localStorage.setItem('fleet_drivers_v4', JSON.stringify(drivers)); }, [drivers]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // --- HANDLERS ---
  const handleDispatch = () => {
    if (!newAssignment.driverId || !newAssignment.truckId || !newAssignment.routeId) return;
    const item = { id: Date.now(), ...newAssignment, startTime: new Date().toISOString(), status: 'Dispatched' };
    setAssignments([item, ...assignments]);
    setDrivers(prev => prev.map(d => d.id === newAssignment.driverId ? { ...d, status: 'busy' } : d));
    setTrucks(prev => prev.map(t => t.id === newAssignment.truckId ? { ...t, status: 'busy' } : t));
    setNewAssignment({ driverId: '', truckId: '', routeId: '', shift: SHIFTS[0] });
    setShowDispatchModal(false);
    showNotification('Dispatched successfully');
  };

  const handleComplete = (id) => {
    const item = assignments.find(a => a.id === id);
    if (!item) return;
    setDrivers(prev => prev.map(d => d.id === item.driverId ? { ...d, status: 'available' } : d));
    setTrucks(prev => prev.map(t => t.id === item.truckId ? { ...t, status: 'available' } : t));
    setHistory(prev => [{ ...item, status: 'Completed', completedAt: new Date().toISOString() }, ...prev]);
    setAssignments(prev => prev.filter(a => a.id !== id));
    showNotification('Shift completed');
  };

  const handleSaveResource = () => {
    // Simple add logic for demo brevity
    if (addModalType === 'truck' && newResource.plate) {
       setTrucks([...trucks, { id: Date.now(), ...newResource, status: 'available' }]);
    } else if (addModalType === 'route' && newResource.name) {
       setRoutes([...routes, { id: Date.now(), ...newResource }]);
    } else if (addModalType === 'driver' && newResource.name) {
       const initials = newResource.name.slice(0,2).toUpperCase();
       setDrivers([...drivers, { id: Date.now(), ...newResource, status: 'available', avatar: initials }]);
    }
    setShowAddModal(false);
    showNotification('Added successfully');
  };

  // --- COMPONENTS ---

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-500'}`}>
        <Icon size={22} strokeWidth={2.5} />
      </div>
    </div>
  );

  const AssignmentCard = ({ data }) => {
    const driver = drivers.find(d => d.id === data.driverId);
    const truck = trucks.find(t => t.id === data.truckId);
    const route = routes.find(r => r.id === data.routeId);

    return (
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 mb-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg border border-slate-200">
              {driver?.avatar || 'DR'}
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-900">{driver?.name}</h4>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <User size={12} /> {driver?.license}
              </div>
            </div>
          </div>
          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full">
            Dispatched
          </span>
        </div>

        {/* Info Grid (Gray Boxes) */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <p className="text-slate-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
              <Truck size={10} /> Vehicle
            </p>
            <p className="text-lg font-bold text-slate-800">{truck?.plate}</p>
            <p className="text-xs text-slate-500">{truck?.type}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <p className="text-slate-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
              <MapPin size={10} /> Route
            </p>
            <p className="text-lg font-bold text-slate-800 truncate">{route?.name}</p>
            <p className="text-xs text-slate-500">{route?.distance}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <Clock size={16} className="text-slate-400" />
            Shift: {data.shift}
          </div>
          <button 
            onClick={() => handleComplete(data.id)}
            className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <CheckCircle size={18} /> Complete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 text-slate-900">
      
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
          <div className="bg-emerald-600 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-sm font-bold">
            <CheckCircle size={16} /> {notification}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white px-6 py-4 sticky top-0 z-20 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white"><Navigation size={18} fill="currentColor" /></div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Fleet<span className="text-blue-600">Ops</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <Search size={22} className="text-slate-400" />
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">AD</div>
        </div>
      </header>

      {/* Main Body */}
      <main className="p-5 max-w-lg mx-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Active" value={assignments.length} icon={Navigation} color="blue" />
              <StatCard title="Avail Trucks" value={trucks.filter(t => t.status === 'available').length} icon={Truck} color="green" />
            </div>

            {/* List */}
            <div>
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-xl font-bold text-slate-900">Active Fleet</h2>
                <span className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                  {new Date().toLocaleDateString()}
                </span>
              </div>

              {assignments.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-400 text-sm">No active trucks.</p>
                  <p className="text-blue-600 text-sm font-medium mt-1">Tap + to dispatch.</p>
                </div>
              ) : (
                assignments.map(a => <AssignmentCard key={a.id} data={a} />)
              )}
            </div>
          </div>
        )}

        {/* --- OTHER TABS (Simulated for brevity) --- */}
        {activeTab === 'records' && (
           <div className="p-4 text-center text-slate-500">Records View (Export enabled)</div>
        )}
        {activeTab === 'fleet' && (
           <div className="space-y-4">
             <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Fleet</h2> <button onClick={() => {setAddModalType('truck'); setShowAddModal(true)}}><Plus/></button></div>
             {trucks.map(t => <div key={t.id} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between"><span>{t.plate}</span> <span className={`text-xs px-2 py-1 rounded ${t.status === 'available' ? 'bg-green-100 text-green-700': 'bg-blue-100 text-blue-700'}`}>{t.status}</span></div>)}
           </div>
        )}
      </main>

      {/* FAB */}
      {activeTab === 'dashboard' && (
        <button 
          onClick={() => setShowDispatchModal(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all z-30"
        >
          <Plus size={28} />
        </button>
      )}

      {/* Dispatch Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Dispatch Vehicle</h3>
              <button onClick={() => setShowDispatchModal(false)}><X className="text-slate-400" /></button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Route</label>
                <select className="w-full mt-1 p-3 bg-slate-50 rounded-xl border-none outline-none font-medium" value={newAssignment.routeId} onChange={e => setNewAssignment({...newAssignment, routeId: e.target.value})}>
                  <option value="">Select Route</option>
                  {routes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Driver</label>
                    <select className="w-full mt-1 p-3 bg-slate-50 rounded-xl border-none outline-none font-medium" value={newAssignment.driverId} onChange={e => setNewAssignment({...newAssignment, driverId: e.target.value})}>
                    <option value="">Select Driver</option>
                    {drivers.filter(d => d.status === 'available').map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Truck</label>
                    <select className="w-full mt-1 p-3 bg-slate-50 rounded-xl border-none outline-none font-medium" value={newAssignment.truckId} onChange={e => setNewAssignment({...newAssignment, truckId: e.target.value})}>
                    <option value="">Select Truck</option>
                    {trucks.filter(t => t.status === 'available').map(t => <option key={t.id} value={t.id}>{t.plate}</option>)}
                    </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Shift</label>
                <div className="flex gap-2 mt-1 overflow-x-auto">
                    {SHIFTS.map(s => (
                        <button key={s} onClick={() => setNewAssignment({...newAssignment, shift: s})} className={`px-4 py-2 rounded-lg text-sm font-medium ${newAssignment.shift === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{s}</button>
                    ))}
                </div>
              </div>
            </div>

            <button onClick={handleDispatch} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-transform">
              Confirm Dispatch
            </button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6">
            <div className="bg-white w-full max-w-xs rounded-2xl p-6">
                <h3 className="font-bold mb-4">Add {addModalType}</h3>
                <input className="w-full bg-slate-50 p-3 rounded-lg mb-4" placeholder="Name/Plate" value={newResource.name || newResource.plate} onChange={e => setNewResource({...newResource, name: e.target.value, plate: e.target.value})} />
                <button onClick={handleSaveResource} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg">Save</button>
                <button onClick={() => setShowAddModal(false)} className="w-full mt-2 text-slate-400 text-sm">Cancel</button>
            </div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}>
          <LayoutDashboard size={24} strokeWidth={activeTab === 'dashboard' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Dash</span>
        </button>
        <button onClick={() => setActiveTab('fleet')} className={`flex flex-col items-center gap-1 ${activeTab === 'fleet' ? 'text-blue-600' : 'text-slate-400'}`}>
          <List size={24} strokeWidth={activeTab === 'fleet' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Fleet</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-blue-600' : 'text-slate-400'}`}>
          <Settings size={24} strokeWidth={activeTab === 'settings' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Settings</span>
        </button>
      </nav>

      <style>{`
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce-in { 0% { transform: translate(-50%, -200%); } 60% { transform: translate(-50%, 10%); } 100% { transform: translate(-50%, 0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
}