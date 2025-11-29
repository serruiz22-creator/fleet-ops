import React, { useState, useEffect } from 'react';
import { 
  Truck, User, MapPin, Plus, CheckCircle, Clock, Search, X,
  LayoutDashboard, List, Settings, AlertCircle, Navigation,
  Trash2, Route as RouteIcon, Bell, Download, History, Edit2
} from 'lucide-react';

// --- Extracted Data ---
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
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalType, setAddModalType] = useState('truck'); 
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null); 
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [history, setHistory] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ driverId: '', truckId: '', routeId: '', shift: SHIFTS[0] });
  const [newResource, setNewResource] = useState({ name: '', plate: '', type: '', capacity: 'Medium', distance: '', estTime: '', license: '' });

  useEffect(() => {
    const savedAssignments = localStorage.getItem('fleet_assignments_v3');
    const savedHistory = localStorage.getItem('fleet_history_v3');
    const savedTrucks = localStorage.getItem('fleet_trucks_v3');
    const savedRoutes = localStorage.getItem('fleet_routes_v3');
    const savedDrivers = localStorage.getItem('fleet_drivers_v3');
    
    if (savedTrucks) setTrucks(JSON.parse(savedTrucks));
    if (savedRoutes) setRoutes(JSON.parse(savedRoutes));
    if (savedDrivers) setDrivers(JSON.parse(savedDrivers));
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    let currentAssignments = [];
    if (savedAssignments) {
        currentAssignments = JSON.parse(savedAssignments);
    }

    const now = new Date();
    const keptAssignments = [];
    const archivedAssignments = [];
    const resourcesToFree = { drivers: [], trucks: [] };

    currentAssignments.forEach(assignment => {
        const startTime = new Date(assignment.startTime);
        const diffInHours = (now - startTime) / 1000 / 60 / 60;

        if (diffInHours >= 24) {
            archivedAssignments.push({
                ...assignment,
                completedAt: now.toISOString(),
                status: 'Auto-Completed (24h)'
            });
            resourcesToFree.drivers.push(assignment.driverId);
            resourcesToFree.trucks.push(assignment.truckId);
        } else {
            keptAssignments.push(assignment);
        }
    });

    if (archivedAssignments.length > 0) {
        setAssignments(keptAssignments);
        setHistory(prev => [...archivedAssignments, ...prev]); 
        setDrivers(prevDrivers => prevDrivers.map(d => resourcesToFree.drivers.includes(d.id) ? { ...d, status: 'available' } : d));
        setTrucks(prevTrucks => prevTrucks.map(t => resourcesToFree.trucks.includes(t.id) ? { ...t, status: 'available' } : t));
    } else {
        setAssignments(currentAssignments);
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    }
  }, []);

  useEffect(() => { localStorage.setItem('fleet_assignments_v3', JSON.stringify(assignments)); }, [assignments]);
  useEffect(() => { localStorage.setItem('fleet_history_v3', JSON.stringify(history)); }, [history]);
  useEffect(() => { localStorage.setItem('fleet_trucks_v3', JSON.stringify(trucks)); }, [trucks]);
  useEffect(() => { localStorage.setItem('fleet_routes_v3', JSON.stringify(routes)); }, [routes]);
  useEffect(() => { localStorage.setItem('fleet_drivers_v3', JSON.stringify(drivers)); }, [drivers]);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        new Notification('FleetOps', { body: 'Notifications enabled!' });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const showNotification = (message, type = 'success') => {
    if ('Notification' in window && Notification.permission === 'granted') {
      try { new Notification('FleetOps Update', { body: message }); } catch (e) {}
    }
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const exportToCSV = () => {
    if (history.length === 0) { alert("No records to export."); return; }
    const headers = ["Date Dispatched", "Completed At", "Driver", "Truck", "Route", "Shift", "Status"];
    const rows = history.map(h => {
        const driverName = drivers.find(d => d.id === h.driverId)?.name || 'Unknown';
        const truckPlate = trucks.find(t => t.id === h.truckId)?.plate || 'Unknown';
        const routeName = routes.find(r => r.id === h.routeId)?.name || 'Unknown';
        return [`"${new Date(h.startTime).toLocaleString()}"`, `"${h.completedAt ? new Date(h.completedAt).toLocaleString() : 'N/A'}"`, `"${driverName}"`, `"${truckPlate}"`, `"${routeName}"`, `"${h.shift}"`, `"${h.status}"`].join(",");
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fleet_records_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateAssignment = () => {
    if (!newAssignment.driverId || !newAssignment.truckId || !newAssignment.routeId) return;
    const assignment = { id: Date.now(), ...newAssignment, startTime: new Date().toISOString(), status: 'Dispatched' };
    setAssignments([assignment, ...assignments]);
    setDrivers(prev => prev.map(d => d.id === newAssignment.driverId ? { ...d, status: 'busy' } : d));
    setTrucks(prev => prev.map(t => t.id === newAssignment.truckId ? { ...t, status: 'busy' } : t));
    setNewAssignment({ driverId: '', truckId: '', routeId: '', shift: SHIFTS[0] });
    setShowDispatchModal(false);
    showNotification('Vehicle dispatched successfully!');
  };

  const handleCompleteShift = (assignmentId) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;
    setDrivers(prev => prev.map(d => d.id === assignment.driverId ? { ...d, status: 'available' } : d));
    setTrucks(prev => prev.map(t => t.id === assignment.truckId ? { ...t, status: 'available' } : t));
    const completedRecord = { ...assignment, status: 'Completed', completedAt: new Date().toISOString() };
    setHistory(prev => [completedRecord, ...prev]);
    setAssignments(prev => prev.filter(a => a.id !== assignmentId));
    showNotification('Shift completed and archived');
  };

  const openAddModal = (type) => {
    setAddModalType(type);
    setEditingId(null); 
    setNewResource({ name: '', plate: '', type: '', capacity: 'Medium', distance: '', estTime: '', license: '' });
    setShowAddModal(true);
  };

  const openEditModal = (type, item) => {
    setAddModalType(type);
    setEditingId(item.id);
    setNewResource({ name: item.name || '', plate: item.plate || '', type: item.type || '', capacity: item.capacity || 'Medium', distance: item.distance || '', estTime: item.estTime || '', license: item.license || '' });
    setShowAddModal(true);
  };

  const handleSaveResource = () => {
    if (editingId) {
      if (addModalType === 'truck') {
         if (!newResource.plate) return;
         setTrucks(prev => prev.map(t => t.id === editingId ? { ...t, ...newResource } : t));
         showNotification(`Truck ${newResource.plate} updated`);
      } else if (addModalType === 'route') {
         if (!newResource.name) return;
         setRoutes(prev => prev.map(r => r.id === editingId ? { ...r, ...newResource } : r));
         showNotification(`Route updated`);
      } else if (addModalType === 'driver') {
         if (!newResource.name) return;
         const initials = newResource.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
         setDrivers(prev => prev.map(d => d.id === editingId ? { ...d, ...newResource, avatar: initials || d.avatar } : d));
         showNotification(`Operator ${newResource.name} updated`);
      }
    } else {
      if (addModalType === 'truck') {
        if (!newResource.plate || !newResource.type) return;
        const newTruck = { id: `t-${Date.now()}`, plate: newResource.plate, type: newResource.type, capacity: newResource.capacity, status: 'available' };
        setTrucks([...trucks, newTruck]);
        showNotification(`Truck ${newResource.plate} added`);
      } else if (addModalType === 'route') {
        if (!newResource.name || !newResource.distance) return;
        const newRoute = { id: `r-${Date.now()}`, name: newResource.name, distance: newResource.distance, estTime: newResource.estTime || 'TBD' };
        setRoutes([...routes, newRoute]);
        showNotification('Route added');
      } else if (addModalType === 'driver') {
        if (!newResource.name || !newResource.license) return;
        const initials = newResource.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        const newDriver = { id: `d-${Date.now()}`, name: newResource.name, license: newResource.license, status: 'available', avatar: initials || 'OP' };
        setDrivers([...drivers, newDriver]);
        showNotification(`Operator ${newResource.name} added`);
      }
    }
    setShowAddModal(false);
  };

  const handleRemoveTruck = (id) => {
    const truck = trucks.find(t => t.id === id);
    if (truck.status === 'busy') { alert("Cannot remove a truck that is currently dispatched."); return; }
    setTrucks(trucks.filter(t => t.id !== id));
  };
  const handleRemoveRoute = (id) => {
    const isUsed = assignments.some(a => a.routeId === id);
    if (isUsed) { alert("Cannot remove a route that is currently active."); return; }
    setRoutes(routes.filter(r => r.id !== id));
  };
  const handleRemoveDriver = (id) => {
    const driver = drivers.find(d => d.id === id);
    if (driver.status === 'busy') { alert("Cannot remove a driver that is currently on a shift."); return; }
    setDrivers(drivers.filter(d => d.id !== id));
  };

  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
  );

  const AssignmentCard = ({ data, isHistory = false }) => {
    const driver = drivers.find(d => d.id === data.driverId);
    const truck = trucks.find(t => t.id === data.truckId);
    const route = routes.find(r => r.id === data.routeId);

    return (
      <div className={`bg-white rounded-xl shadow-sm border-l-4 p-4 mb-4 relative overflow-hidden ${isHistory ? 'border-slate-400' : 'border-blue-500'}`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold border text-sm ${isHistory ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
              {driver?.avatar || '??'}
            </div>
            <div>
              <h4 className="font-bold text-slate-800">{driver?.name || 'Unknown Driver'}</h4>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <User size={10} /> {driver?.license || 'N/A'}
              </span>
            </div>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${isHistory ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
            {data.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div className="bg-slate-50 p-2 rounded-lg">
            <p className="text-slate-400 text-xs mb-1 flex items-center gap-1"><Truck size={10}/> Vehicle</p>
            <p className="font-semibold text-slate-700">{truck?.plate || 'Unknown'}</p>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg">
            <p className="text-slate-400 text-xs mb-1 flex items-center gap-1"><MapPin size={10}/> Route</p>
            <p className="font-semibold text-slate-700 truncate">{route?.name || 'Unknown'}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
           <div className="text-xs text-slate-500 flex flex-col">
             <span className="flex items-center gap-1"><Clock size={12} /> {data.shift.split(' ')[0]}</span>
             {isHistory && <span className="text-[10px] mt-0.5">{new Date(data.startTime).toLocaleDateString()}</span>}
           </div>
           {!isHistory && (
               <button onClick={() => handleCompleteShift(data.id)} className="text-green-600 hover:text-green-700 text-sm font-semibold flex items-center gap-1 active:scale-95 transition-transform">
                 <CheckCircle size={16} /> Complete
               </button>
           )}
           {isHistory && (
               <div className="text-[10px] text-slate-400">
                   Ended: {new Date(data.completedAt || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
               </div>
           )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce-in w-max max-w-[90vw]">
          <div className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow-xl shadow-emerald-600/20 flex items-center gap-2 font-semibold text-sm">
            <CheckCircle size={18} className="text-emerald-200 shrink-0" />
            <span className="truncate">{notification.message}</span>
          </div>
        </div>
      )}

      <header className="bg-white sticky top-0 z-10 border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <Navigation size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">Fleet<span className="text-blue-600">Ops</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-600">AD</div>
        </div>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 gap-3">
              <StatCard title="Active" value={assignments.length} icon={Navigation} colorClass="bg-blue-100 text-blue-600" />
              <StatCard title="Avail Trucks" value={trucks.filter(t => t.status === 'available').length} icon={Truck} colorClass="bg-emerald-100 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800">Active Fleet</h2>
                <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full border border-slate-200">{new Date().toLocaleDateString()}</span>
              </div>
              {assignments.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                  <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Truck className="text-slate-300" size={32} />
                  </div>
                  <p className="text-slate-500 font-medium">No active trucks</p>
                  <p className="text-xs text-slate-400">Dispatch a vehicle to get started</p>
                </div>
              ) : (
                assignments.map(assignment => (
                  <AssignmentCard key={assignment.id} data={assignment} />
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'records' && (
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800">Dispatch Records</h2>
                    <button onClick={exportToCSV} className="flex items-center gap-2 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md active:scale-95 transition-transform">
                        <Download size={14} /> Export CSV
                    </button>
                </div>
                <div className="space-y-4">
                    {history.length === 0 ? (
                         <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <History className="text-slate-300" size={32} />
                            </div>
                            <p className="text-slate-500 font-medium">No records yet</p>
                            <p className="text-xs text-slate-400">Completed shifts will appear here</p>
                        </div>
                    ) : (
                        history.map(record => (
                            <AssignmentCard key={record.id} data={record} isHistory={true} />
                        ))
                    )}
                </div>
            </div>
        )}

        {activeTab === 'fleet' && (
          <div className="space-y-6 animate-fade-in">
             <h2 className="text-lg font-bold text-slate-800 mb-2">Fleet Management</h2>
             <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
               <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-semibold text-sm text-slate-600 flex justify-between items-center">
                  <div className="flex items-center gap-2"><span>Operators</span><span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">{drivers.length}</span></div>
                  <button onClick={() => openAddModal('driver')} className="text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors"><Plus size={18} /></button>
               </div>
               <div className="max-h-[300px] overflow-y-auto">
                {drivers.map((d, i) => (
                  <div key={d.id} className={`flex items-center justify-between p-4 ${i !== drivers.length -1 ? 'border-b border-slate-100': ''}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${d.status === 'available' ? 'bg-emerald-500' : d.status === 'busy' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                        <div><p className="text-sm font-medium text-slate-800">{d.name}</p><p className="text-xs text-slate-500">{d.license}</p></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal('driver', d)} className="text-slate-400 hover:text-blue-500 transition-colors p-2"><Edit2 size={16} /></button>
                        <button onClick={() => handleRemoveDriver(d.id)} className="text-slate-300 hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>
                      </div>
                  </div>
                ))}
               </div>
             </div>

             <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
               <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-semibold text-sm text-slate-600 flex justify-between items-center">
                  <div className="flex items-center gap-2"><span>Vehicles</span><span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">{trucks.length}</span></div>
                  <button onClick={() => openAddModal('truck')} className="text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors"><Plus size={18} /></button>
               </div>
               <div className="max-h-[300px] overflow-y-auto">
                 {trucks.map((t, i) => (
                   <div key={t.id} className={`flex items-center justify-between p-4 ${i !== trucks.length -1 ? 'border-b border-slate-100': ''}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${t.status === 'available' ? 'bg-emerald-500' : t.status === 'busy' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                        <div><p className="text-sm font-medium text-slate-800">{t.plate}</p><p className="text-xs text-slate-500">{t.type}</p></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal('truck', t)} className="text-slate-400 hover:text-blue-500 transition-colors p-2"><Edit2 size={16} /></button>
                        <button onClick={() => handleRemoveTruck(t.id)} className="text-slate-300 hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>
                      </div>
                   </div>
                 ))}
               </div>
             </div>

             <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
               <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-semibold text-sm text-slate-600 flex justify-between items-center">
                  <div className="flex items-center gap-2"><span>Routes</span><span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">{routes.length}</span></div>
                  <button onClick={() => openAddModal('route')} className="text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors"><Plus size={18} /></button>
               </div>
               {routes.map((r, i) => (
                 <div key={r.id} className={`flex items-center justify-between p-4 ${i !== routes.length -1 ? 'border-b border-slate-100': ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-full text-slate-500"><RouteIcon size={16} /></div>
                      <div className="overflow-hidden"><p className="text-sm font-medium text-slate-800 truncate w-40 sm:w-60">{r.name}</p><p className="text-xs text-slate-500">{r.distance} • {r.estTime}</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal('route', r)} className="text-slate-400 hover:text-blue-500 transition-colors p-2"><Edit2 size={16} /></button>
                        <button onClick={() => handleRemoveRoute(r.id)} className="text-slate-300 hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-bold text-slate-800">App Settings</h2>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div><h3 className="font-semibold text-slate-800">Notifications</h3><p className="text-sm text-slate-500">Enable system notifications.</p></div>
              <button onClick={requestNotificationPermission} className={`p-3 rounded-full transition-colors ${notificationsEnabled ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}><Bell size={24} /></button>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-2">Auto-Clear</h3>
                <p className="text-sm text-slate-500">Dispatched trucks are automatically moved to the "Records" tab 24 hours after they are started.</p>
            </div>
             <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mt-4">
                <h3 className="font-semibold text-slate-800 mb-2">Data Management</h3>
                <button onClick={() => { if(window.confirm('Clear all data?')) { localStorage.clear(); window.location.reload(); } }} className="w-full text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 font-semibold py-2 rounded-lg transition-colors">Reset Application</button>
             </div>
          </div>
        )}
      </main>

      {activeTab === 'dashboard' && (
        <button onClick={() => setShowDispatchModal(true)} className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all z-40"><Plus size={24} /></button>
      )}

      {showDispatchModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between"><h3 className="font-bold text-lg text-slate-800">Dispatch Vehicle</h3><button onClick={() => setShowDispatchModal(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button></div>
            <div className="p-6 overflow-y-auto space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Select Route</label>
                <div className="grid grid-cols-1 gap-2">
                  {routes.length === 0 ? <div className="p-4 text-center border border-dashed rounded-xl text-slate-400 text-sm">No routes available. Go to Fleet tab to add.</div> : routes.map(route => (
                      <button key={route.id} onClick={() => setNewAssignment({...newAssignment, routeId: route.id})} className={`p-3 rounded-xl border text-left transition-all ${newAssignment.routeId === route.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:bg-slate-50'}`}>
                        <div className="font-semibold text-slate-800">{route.name}</div><div className="text-xs text-slate-500 mt-1 flex justify-between"><span>{route.distance}</span><span>{route.estTime}</span></div>
                      </button>
                    ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Select Driver</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" value={newAssignment.driverId} onChange={(e) => setNewAssignment({...newAssignment, driverId: e.target.value})}>
                  <option value="">Choose available driver...</option>
                  {drivers.filter(d => d.status === 'available').map(d => (<option key={d.id} value={d.id}>{d.name} ({d.license})</option>))}
                </select>
                {drivers.filter(d => d.status === 'available').length === 0 && <p className="text-xs text-amber-600 flex items-center gap-1"><AlertCircle size={12}/> No drivers available</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Select Truck</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" value={newAssignment.truckId} onChange={(e) => setNewAssignment({...newAssignment, truckId: e.target.value})}>
                  <option value="">Choose available truck...</option>
                  {trucks.filter(t => t.status === 'available').map(t => (<option key={t.id} value={t.id}>{t.plate} - {t.type}</option>))}
                </select>
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700 block">Shift</label>
                 <div className="flex gap-2 overflow-x-auto pb-2">
                   {SHIFTS.map(shift => (
                     <button key={shift} onClick={() => setNewAssignment({...newAssignment, shift})} className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${newAssignment.shift === shift ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{shift.split(' ')[0]}</button>
                   ))}
                 </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
              <button onClick={handleCreateAssignment} disabled={!newAssignment.driverId || !newAssignment.truckId || !newAssignment.routeId} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">Confirm Dispatch</button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">{editingId ? 'Edit' : 'Add'} {addModalType === 'truck' ? 'Truck' : addModalType === 'route' ? 'Route' : 'Operator'}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {addModalType === 'truck' && (
                <>
                  <div><label className="text-xs font-bold text-slate-500 uppercase tracking-wide">License Plate</label><input type="text" placeholder="e.g. FLT-999" className="w-full mt-1 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newResource.plate} onChange={e => setNewResource({...newResource, plate: e.target.value})} /></div>
                  <div><label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Vehicle Model</label><input type="text" placeholder="e.g. Ford F-150" className="w-full mt-1 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newResource.type} onChange={e => setNewResource({...newResource, type: e.target.value})} /></div>
                  <div><label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Capacity</label><select className="w-full mt-1 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white" value={newResource.capacity} onChange={e => setNewResource({...newResource, capacity: e.target.value})}><option>Light</option><option>Medium</option><option>Heavy</option></select></div>
                </>
              )}
              {addModalType === 'route' && (
                <>
                  <div><label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Route Name</label><input type="text" placeholder="e.g. West Coast Delivery" className="w-full mt-1 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newResource.name} onChange={e => setNewResource({...newResource, name: e.target.value})} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Distance</label><input type="text" placeholder="e.g. 50mi" className="w-full mt-1 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newResource.distance} onChange={e => setNewResource({...newResource, distance: e.target.value})} /></div>
                    <div><label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Est. Time</label><input type="text" placeholder="e.g. 1h 30m" className="w-full mt-1 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newResource.estTime} onChange={e => setNewResource({...newResource, estTime: e.target.value})} /></div>
                  </div>
                </>
              )}
              {addModalType === 'driver' && (
                <>
                  <div><label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</label><input type="text" placeholder="e.g. Jane Doe" className="w-full mt-1 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newResource.name} onChange={e => setNewResource({...newResource, name: e.target.value})} /></div>
                  <div><label className="text-xs font-bold text-slate-500 uppercase tracking-wide">License Type</label><input type="text" placeholder="e.g. CDL-A" className="w-full mt-1 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newResource.license} onChange={e => setNewResource({...newResource, license: e.target.value})} /></div>
                </>
              )}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <button onClick={handleSaveResource} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">{editingId ? 'Update' : 'Save'} {addModalType === 'truck' ? 'Truck' : addModalType === 'route' ? 'Route' : 'Operator'}</button>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2 flex justify-between items-center z-40 pb-safe">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}><LayoutDashboard size={24} strokeWidth={activeTab === 'dashboard' ? 2.5 : 2} /><span className="text-[10px] font-medium mt-1">Dash</span></button>
        <button onClick={() => setActiveTab('records')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'records' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}><History size={24} strokeWidth={activeTab === 'records' ? 2.5 : 2} /><span className="text-[10px] font-medium mt-1">Records</span></button>
        <button onClick={() => setActiveTab('fleet')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'fleet' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}><List size={24} strokeWidth={activeTab === 'fleet' ? 2.5 : 2} /><span className="text-[10px] font-medium mt-1">Fleet</span></button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'settings' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}><Settings size={24} strokeWidth={activeTab === 'settings' ? 2.5 : 2} /><span className="text-[10px] font-medium mt-1">Settings</span></button>
      </nav>
      
      <style>{`
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 16px); }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce-in { 0% { transform: translate(-50%, -200%); } 60% { transform: translate(-50%, 10%); } 100% { transform: translate(-50%, 0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
}
//final fix