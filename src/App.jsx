import React, { useState, useEffect } from 'react';
import { 
  Truck, User, MapPin, Plus, CheckCircle, Clock, Search, X,
  LayoutDashboard, List, Settings, AlertCircle, Navigation,
  Trash2, Route as RouteIcon, Bell, Download, History, Edit2
} from 'lucide-react';

// --- FULL DATA ---
const INITIAL_DRIVERS = [
  { id: 'd1', name: 'Delgadillo', license: 'CDL-A', status: 'available', avatar: 'DE' },
  { id: 'd2', name: 'Ochoa', license: 'CDL-A', status: 'available', avatar: 'OC' },
  { id: 'd3', name: 'R.D. Garcia', license: 'CDL-A', status: 'available', avatar: 'RG' },
  { id: 'd4', name: 'Vazquez', license: 'CDL-A', status: 'available', avatar: 'VA' },
  { id: 'd5', name: 'Figueroa', license: 'CDL-A', status: 'available', avatar: 'FI' },
  { id: 'd6', name: 'Varela', license: 'CDL-A', status: 'available', avatar: 'VR' },
  { id: 'd7', name: 'Carrillo', license: 'CDL-A', status: 'available', avatar: 'CA' },
  { id: 'd8', name: 'Dominguez', license: 'CDL-A', status: 'available', avatar: 'DO' },
  { id: 'd9', name: 'Ruiz', license: 'CDL-A', status: 'available', avatar: 'RU' },
  { id: 'd10', name: 'Ucclop', license: 'CDL-A', status: 'available', avatar: 'UC' },
  { id: 'd11', name: 'Sanchez', license: 'CDL-A', status: 'available', avatar: 'SA' },
  { id: 'd12', name: 'Flores', license: 'CDL-A', status: 'available', avatar: 'FL' },
  { id: 'd13', name: 'Barraza', license: 'CDL-A', status: 'available', avatar: 'BA' },
  { id: 'd14', name: 'Burgos', license: 'CDL-A', status: 'available', avatar: 'BU' },
  { id: 'd15', name: 'Ospina', license: 'CDL-A', status: 'available', avatar: 'OS' },
  { id: 'd16', name: 'Michael', license: 'CDL-A', status: 'available', avatar: 'MI' },
  { id: 'd17', name: 'Mendez', license: 'CDL-A', status: 'available', avatar: 'ME' },
  { id: 'd18', name: 'Martinez', license: 'CDL-A', status: 'available', avatar: 'MA' },
  { id: 'd19', name: 'Corey Hdz', license: 'CDL-A', status: 'available', avatar: 'CH' },
  { id: 'd20', name: 'Ebron', license: 'CDL-A', status: 'available', avatar: 'EB' },
  { id: 'd21', name: 'Diaz', license: 'CDL-A', status: 'available', avatar: 'DI' },
  { id: 'd22', name: 'Saez', license: 'CDL-A', status: 'available', avatar: 'SZ' },
  { id: 'd23', name: 'Rodriguez', license: 'CDL-A', status: 'available', avatar: 'RO' },
  { id: 'd24', name: 'Joshua H', license: 'CDL-A', status: 'available', avatar: 'JH' },
  { id: 'd25', name: 'Gutierrez', license: 'CDL-A', status: 'available', avatar: 'GU' },
  { id: 'd26', name: 'Antuna', license: 'CDL-A', status: 'available', avatar: 'AN' },
  { id: 'd27', name: 'Tarango', license: 'CDL-A', status: 'available', avatar: 'TA' },
  { id: 'd28', name: 'Sierra', license: 'CDL-A', status: 'available', avatar: 'SI' },
  { id: 'd29', name: 'Chavez', license: 'CDL-A', status: 'available', avatar: 'CZ' },
];

const INITIAL_TRUCKS = [
  { id: 't427', plate: '427', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't1046', plate: '1046', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't1047', plate: '1047', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't1065', plate: '1065', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't1082', plate: '1082', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4037', plate: '4037', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4064', plate: '4064', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4079', plate: '4079', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4080', plate: '4080', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4082', plate: '4082', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4098', plate: '4098', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4099', plate: '4099', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4113', plate: '4113', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4115', plate: '4115', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4124', plate: '4124', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4127', plate: '4127', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4132', plate: '4132', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4134', plate: '4134', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4145', plate: '4145', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4146', plate: '4146', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4147', plate: '4147', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4153', plate: '4153', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4155', plate: '4155', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4156', plate: '4156', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4157', plate: '4157', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4161', plate: '4161', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4164', plate: '4164', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4166', plate: '4166', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4167', plate: '4167', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4168', plate: '4168', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4169', plate: '4169', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4170', plate: '4170', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4171', plate: '4171', type: 'Truck', status: 'available', capacity: 'Standard' },
  { id: 't4178', plate: '4178', type: 'Truck', status: 'available', capacity: 'Standard' },
];

const INITIAL_ROUTES = [
  { id: 'r1', name: 'West 1', distance: 'Local', estTime: '8h' },
  { id: 'r2', name: 'West 2', distance: 'Local', estTime: '8h' },
  { id: 'r3', name: 'GY/Route', distance: 'Regional', estTime: '10h' },
  { id: 'r4', name: 'EVE/RU', distance: 'Regional', estTime: '12h' },
  { id: 'r5', name: 'AP Route', distance: 'Long Haul', estTime: '24h+' },
];

const SHIFTS = ['Morning (06:00 - 14:00)', 'Afternoon (14:00 - 22:00)', 'Night (22:00 - 06:00)'];

export default function FleetApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [trucks, setTrucks] = useState(INITIAL_TRUCKS);
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  
  const [assignments, setAssignments] = useState([]);
  const [history, setHistory] = useState([]);
  
  // UI State
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalType, setAddModalType] = useState('truck'); 
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null); 
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Forms
  const [newAssignment, setNewAssignment] = useState({ driverId: '', truckId: '', routeId: '', shift: SHIFTS[0] });
  const [newResource, setNewResource] = useState({ name: '', plate: '', type: '', capacity: 'Medium', distance: '', estTime: '', license: '' });

  // --- LOADING & PERSISTENCE ---
  useEffect(() => {
    // We use '_v6' now to force a fresh data load and clear any bad cache
    const savedAssignments = localStorage.getItem('fleet_assignments_v6');
    const savedHistory = localStorage.getItem('fleet_history_v6');
    const savedTrucks = localStorage.getItem('fleet_trucks_v6');
    const savedRoutes = localStorage.getItem('fleet_routes_v6');
    const savedDrivers = localStorage.getItem('fleet_drivers_v6');
    
    if (savedTrucks) setTrucks(JSON.parse(savedTrucks));
    if (savedRoutes) setRoutes(JSON.parse(savedRoutes));
    if (savedDrivers) setDrivers(JSON.parse(savedDrivers));
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    let currentAssignments = [];
    if (savedAssignments) currentAssignments = JSON.parse(savedAssignments);

    // Auto-archive (24h)
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

    if ('Notification' in window && Notification.permission === 'granted') setNotificationsEnabled(true);
  }, []);

  useEffect(() => { localStorage.setItem('fleet_assignments_v6', JSON.stringify(assignments)); }, [assignments]);
  useEffect(() => { localStorage.setItem('fleet_history_v6', JSON.stringify(history)); }, [history]);
  useEffect(() => { localStorage.setItem('fleet_trucks_v6', JSON.stringify(trucks)); }, [trucks]);
  useEffect(() => { localStorage.setItem('fleet_routes_v6', JSON.stringify(routes)); }, [routes]);
  useEffect(() => { localStorage.setItem('fleet_drivers_v6', JSON.stringify(drivers)); }, [drivers]);

  // --- LOGIC ---
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) return alert("Not supported");
    if ((await Notification.requestPermission()) === 'granted') setNotificationsEnabled(true);
  };

  const showNotification = (msg) => {
    if (notificationsEnabled) try { new Notification('FleetOps', { body: msg }); } catch(e){}
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const exportToCSV = () => {
    if (history.length === 0) return alert("No records");
    const headers = ["Date", "Completed", "Driver", "Truck", "Route", "Shift", "Status"];
    const rows = history.map(h => {
        const d = drivers.find(x => x.id === h.driverId)?.name || 'Unknown';
        const t = trucks.find(x => x.id === h.truckId)?.plate || 'Unknown';
        const r = routes.find(x => x.id === h.routeId)?.name || 'Unknown';
        return [`"${new Date(h.startTime).toLocaleString()}"`, `"${h.completedAt}"`, `"${d}"`, `"${t}"`, `"${r}"`, `"${h.shift}"`, `"${h.status}"`].join(",");
    });
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `fleet_export_${Date.now()}.csv`; a.click();
  };

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
    const newId = Date.now();
    if (editingId) {
       if (addModalType === 'truck') setTrucks(prev => prev.map(t => t.id === editingId ? { ...t, ...newResource } : t));
       if (addModalType === 'route') setRoutes(prev => prev.map(r => r.id === editingId ? { ...r, ...newResource } : r));
       if (addModalType === 'driver') setDrivers(prev => prev.map(d => d.id === editingId ? { ...d, ...newResource, avatar: newResource.name.slice(0,2).toUpperCase() } : d));
    } else {
       if (addModalType === 'truck' && newResource.plate) setTrucks([...trucks, { id: newId, ...newResource, status: 'available' }]);
       if (addModalType === 'route' && newResource.name) setRoutes([...routes, { id: newId, ...newResource }]);
       if (addModalType === 'driver' && newResource.name) setDrivers([...drivers, { id: newId, ...newResource, status: 'available', avatar: newResource.name.slice(0,2).toUpperCase() }]);
    }
    setShowAddModal(false);
    showNotification(editingId ? 'Updated successfully' : 'Added successfully');
  };

  const handleDelete = (type, id) => {
      if(!window.confirm("Are you sure?")) return;
      if (type === 'truck') setTrucks(trucks.filter(t => t.id !== id));
      if (type === 'route') setRoutes(routes.filter(r => r.id !== id));
      if (type === 'driver') setDrivers(drivers.filter(d => d.id !== id));
  }

  // --- UI COMPONENTS ---
  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
      <div><p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{title}</p><h3 className="text-3xl font-bold text-slate-800">{value}</h3></div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-500'}`}><Icon size={22} strokeWidth={2.5} /></div>
    </div>
  );

  const AssignmentCard = ({ data, isHistory }) => {
    const driver = drivers.find(d => d.id === data.driverId);
    const truck = trucks.find(t => t.id === data.truckId);
    const route = routes.find(r => r.id === data.routeId);
    return (
      <div className={`bg-white p-5 rounded-3xl shadow-sm border mb-4 ${isHistory ? 'border-slate-200 opacity-90' : 'border-slate-100'}`}>
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg border border-slate-200">{driver?.avatar || 'DR'}</div>
            <div><h4 className="font-bold text-lg text-slate-900">{driver?.name || 'Unknown'}</h4><div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium"><User size={12} /> {driver?.license}</div></div>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${isHistory ? 'bg-slate-100 text-slate-500' : 'bg-blue-50 text-blue-600'}`}>{isHistory ? 'Completed' : 'Dispatched'}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100"><p className="text-slate-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-1"><Truck size={10} /> Vehicle</p><p className="text-lg font-bold text-slate-800">{truck?.plate || 'Unknown'}</p><p className="text-xs text-slate-500">{truck?.type}</p></div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100"><p className="text-slate-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-1"><MapPin size={10} /> Route</p><p className="text-lg font-bold text-slate-800 truncate">{route?.name || 'Unknown'}</p><p className="text-xs text-slate-500">{route?.distance}</p></div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium"><Clock size={16} className="text-slate-400" /> Shift: {data.shift}</div>
          {!isHistory && <button onClick={() => handleComplete(data.id)} className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"><CheckCircle size={18} /> Complete</button>}
          {isHistory && <span className="text-xs text-slate-400">{new Date(data.completedAt).toLocaleDateString()}</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 text-slate-900">
      {notification && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce-in"><div className="bg-emerald-600 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-sm font-bold"><CheckCircle size={16} /> {notification}</div></div>}
      
      <header className="bg-white px-6 py-4 sticky top-0 z-20 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2"><div className="bg-blue-600 p-1.5 rounded-lg text-white"><Navigation size={18} fill="currentColor" /></div><h1 className="text-xl font-bold text-slate-900 tracking-tight">Fleet<span className="text-blue-600">Ops</span></h1></div>
        <div className="flex items-center gap-3"><Search size={22} className="text-slate-400" /><div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">AD</div></div>
      </header>

      <main className="p-5 max-w-lg mx-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-2 gap-4"><StatCard title="Active" value={assignments.length} icon={Navigation} color="blue" /><StatCard title="Avail Trucks" value={trucks.filter(t => t.status === 'available').length} icon={Truck} color="green" /></div>
            <div>
              <div className="flex items-center justify-between mb-4 px-1"><h2 className="text-xl font-bold text-slate-900">Active Fleet</h2><span className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">{new Date().toLocaleDateString()}</span></div>
              {assignments.length === 0 ? <div className="text-center py-12"><p className="text-slate-400 text-sm">No active trucks.</p><p className="text-blue-600 text-sm font-medium mt-1">Tap + to dispatch.</p></div> : assignments.map(a => <AssignmentCard key={a.id} data={a} />)}
            </div>
          </div>
        )}

        {activeTab === 'records' && (
            <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center"><h2 className="text-xl font-bold">History</h2><button onClick={exportToCSV} className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold"><Download size={14}/> Export</button></div>
                {history.length === 0 ? <div className="text-center py-12 text-slate-400">No history yet.</div> : history.map(h => <AssignmentCard key={h.id} data={h} isHistory={true} />)}
            </div>
        )}

        {activeTab === 'fleet' && (
           <div className="space-y-6 pb-12 animate-fade-in">
             {/* Drivers */}
             <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
               <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg">Drivers</h3><button onClick={() => {setEditingId(null); setAddModalType('driver'); setNewResource({name:'', license:''}); setShowAddModal(true)}} className="bg-blue-50 text-blue-600 p-2 rounded-full"><Plus size={18}/></button></div>
               <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
                 {drivers.map(d => (
                   <div key={d.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                     <div className="flex items-center gap-3"><div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold border">{d.avatar}</div><div><p className="font-bold text-sm text-slate-800">{d.name}</p><p className="text-[10px] text-slate-500">{d.license}</p></div></div>
                     <div className="flex gap-2"><button onClick={() => {setEditingId(d.id); setAddModalType('driver'); setNewResource(d); setShowAddModal(true)}}><Edit2 size={14} className="text-slate-400"/></button><button onClick={() => handleDelete('driver', d.id)}><Trash2 size={14} className="text-red-400"/></button></div>
                   </div>
                 ))}
               </div>
             </div>
             {/* Trucks */}
             <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
               <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg">Vehicles</h3><button onClick={() => {setEditingId(null); setAddModalType('truck'); setNewResource({plate:'', type:''}); setShowAddModal(true)}} className="bg-blue-50 text-blue-600 p-2 rounded-full"><Plus size={18}/></button></div>
               <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
                 {trucks.map(t => (
                   <div key={t.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                     <div className="flex items-center gap-3"><div className={`w-2 h-2 rounded-full ${t.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div><div><p className="font-bold text-sm text-slate-800">{t.plate}</p><p className="text-[10px] text-slate-500">{t.type}</p></div></div>
                     <div className="flex gap-2"><button onClick={() => {setEditingId(t.id); setAddModalType('truck'); setNewResource(t); setShowAddModal(true)}}><Edit2 size={14} className="text-slate-400"/></button><button onClick={() => handleDelete('truck', t.id)}><Trash2 size={14} className="text-red-400"/></button></div>
                   </div>
                 ))}
               </div>
             </div>
             {/* Routes */}
             <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
               <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg">Routes</h3><button onClick={() => {setEditingId(null); setAddModalType('route'); setNewResource({name:'', distance:''}); setShowAddModal(true)}} className="bg-blue-50 text-blue-600 p-2 rounded-full"><Plus size={18}/></button></div>
               <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
                 {routes.map(r => (
                   <div key={r.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                     <div><p className="font-bold text-sm text-slate-800">{r.name}</p><p className="text-[10px] text-slate-500">{r.distance} • {r.estTime}</p></div>
                     <div className="flex gap-2"><button onClick={() => {setEditingId(r.id); setAddModalType('route'); setNewResource(r); setShowAddModal(true)}}><Edit2 size={14} className="text-slate-400"/></button><button onClick={() => handleDelete('route', r.id)}><Trash2 size={14} className="text-red-400"/></button></div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-slate-900">Settings</h2>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center"><div><h3 className="font-bold text-slate-800">Notifications</h3><p className="text-xs text-slate-500">Enable system alerts</p></div><button onClick={requestNotificationPermission} className={`p-3 rounded-full ${notificationsEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}><Bell size={20} /></button></div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-2">Reset App</h3>
               <p className="text-xs text-slate-500 mb-4">Clear all local data and assignments.</p>
               <button onClick={() => { if(window.confirm('Reset everything?')) { localStorage.clear(); window.location.reload(); } }} className="w-full bg-red-50 text-red-600 font-bold py-3 rounded-xl border border-red-100">Reset Data</button>
            </div>
          </div>
        )}
      </main>

      {/* TABS */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40">
        {[
          {id: 'dashboard', icon: LayoutDashboard, label: 'Dash'},
          {id: 'records', icon: History, label: 'Records'},
          {id: 'fleet', icon: List, label: 'Fleet'},
          {id: 'settings', icon: Settings, label: 'Settings'}
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center gap-1 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`}>
            <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[10px] font-bold">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* FAB */}
      {activeTab === 'dashboard' && <button onClick={() => setShowDispatchModal(true)} className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all z-30"><Plus size={28} /></button>}

      {/* MODALS */}
      {showDispatchModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6"><h3 className="text-lg font-bold">Dispatch</h3><button onClick={() => setShowDispatchModal(false)}><X className="text-slate-400" /></button></div>
            <div className="space-y-4 mb-6">
              <div><label className="text-xs font-bold text-slate-400 uppercase">Route</label><select className="w-full mt-1 p-3 bg-slate-50 rounded-xl outline-none font-medium" value={newAssignment.routeId} onChange={e => setNewAssignment({...newAssignment, routeId: e.target.value})}><option value="">Select Route</option>{routes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-bold text-slate-400 uppercase">Driver</label><select className="w-full mt-1 p-3 bg-slate-50 rounded-xl outline-none font-medium" value={newAssignment.driverId} onChange={e => setNewAssignment({...newAssignment, driverId: e.target.value})}><option value="">Select</option>{drivers.filter(d => d.status === 'available').map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select></div>
                <div><label className="text-xs font-bold text-slate-400 uppercase">Truck</label><select className="w-full mt-1 p-3 bg-slate-50 rounded-xl outline-none font-medium" value={newAssignment.truckId} onChange={e => setNewAssignment({...newAssignment, truckId: e.target.value})}><option value="">Select</option>{trucks.filter(t => t.status === 'available').map(t => <option key={t.id} value={t.id}>{t.plate}</option>)}</select></div>
              </div>
              <div><label className="text-xs font-bold text-slate-400 uppercase">Shift</label><div className="flex gap-2 mt-1 overflow-x-auto">{SHIFTS.map(s => <button key={s} onClick={() => setNewAssignment({...newAssignment, shift: s})} className={`px-4 py-2 rounded-lg text-xs font-bold ${newAssignment.shift === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{s}</button>)}</div></div>
            </div>
            <button onClick={handleDispatch} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95">Confirm Dispatch</button>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6">
            <div className="bg-white w-full max-w-xs rounded-3xl p-6">
                <h3 className="font-bold mb-4 text-lg">{editingId ? 'Edit' : 'Add'} {addModalType}</h3>
                <div className="space-y-3 mb-6">
                    {addModalType === 'truck' && <><input className="w-full bg-slate-50 p-3 rounded-xl" placeholder="Plate (e.g. 427)" value={newResource.plate} onChange={e => setNewResource({...newResource, plate: e.target.value})} /><input className="w-full bg-slate-50 p-3 rounded-xl" placeholder="Type (e.g. Truck)" value={newResource.type} onChange={e => setNewResource({...newResource, type: e.target.value})} /></>}
                    {addModalType === 'route' && <><input className="w-full bg-slate-50 p-3 rounded-xl" placeholder="Name" value={newResource.name} onChange={e => setNewResource({...newResource, name: e.target.value})} /><input className="w-full bg-slate-50 p-3 rounded-xl" placeholder="Distance" value={newResource.distance} onChange={e => setNewResource({...newResource, distance: e.target.value})} /></>}
                    {addModalType === 'driver' && <><input className="w-full bg-slate-50 p-3 rounded-xl" placeholder="Name" value={newResource.name} onChange={e => setNewResource({...newResource, name: e.target.value})} /><input className="w-full bg-slate-50 p-3 rounded-xl" placeholder="License" value={newResource.license} onChange={e => setNewResource({...newResource, license: e.target.value})} /></>}
                </div>
                <button onClick={handleSaveResource} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl mb-2">Save</button>
                <button onClick={() => setShowAddModal(false)} className="w-full text-slate-400 font-bold py-2">Cancel</button>
            </div>
        </div>
      )}

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