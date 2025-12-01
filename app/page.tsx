"use client";

import React, { useState, useEffect } from 'react';
import { 
  Truck, Users, MapPin, Plus, Trash2, 
  Download, Clock, CheckCircle, AlertCircle, Settings, History, X 
} from 'lucide-react';
import { format, differenceInHours } from 'date-fns';

// --- Types ---
type ShiftType = 'Morning' | 'Afternoon' | 'Night';

interface Driver { id: string; name: string; license: string; }
interface Vehicle { id: string; plate: string; model: string; capacity: string; }
interface Route { id: string; name: string; distance: string; estTime: string; }
interface Dispatch { 
  id: string; 
  driverId: string; 
  truckId: string; 
  routeId: string; 
  shift: ShiftType; 
  startTime: string;
  status: 'Active' | 'Completed';
}

// --- Updated Data Lists ---
const INITIAL_DRIVERS = [
  { id: '1', name: 'Delgadillo', license: 'CDL-A' },
  { id: '2', name: 'Ochoa', license: 'CDL-A' },
  { id: '3', name: 'R.D. Garcia', license: 'CDL-A' },
  { id: '4', name: 'Vazquez', license: 'CDL-A' },
  { id: '5', name: 'Figueroa', license: 'CDL-A' },
  { id: '6', name: 'Varela', license: 'CDL-A' },
  { id: '7', name: 'Carrillo', license: 'CDL-A' },
  { id: '8', name: 'Dominguez', license: 'CDL-A' },
  { id: '9', name: 'Ruiz', license: 'CDL-A' },
  { id: '10', name: 'Sanchez', license: 'CDL-A' },
  { id: '11', name: 'Flores', license: 'CDL-A' },
  { id: '12', name: 'Barraza', license: 'CDL-A' },
  { id: '13', name: 'Burgos', license: 'CDL-A' },
  { id: '14', name: 'Ospina', license: 'CDL-A' },
  { id: '15', name: 'Michael', license: 'CDL-A' },
  { id: '16', name: 'Mendez', license: 'CDL-A' },
  { id: '17', name: 'Martinez', license: 'CDL-A' },
  { id: '18', name: 'Corey Hdz', license: 'CDL-A' },
  { id: '19', name: 'Ebron', license: 'CDL-A' },
  { id: '20', name: 'Diaz', license: 'CDL-A' },
  { id: '21', name: 'Saez', license: 'CDL-A' },
  { id: '22', name: 'Rodriguez', license: 'CDL-A' },
  { id: '23', name: 'Joshua H.', license: 'CDL-A' },
  { id: '24', name: 'Gutierrez', license: 'CDL-A' },
  { id: '25', name: 'Antuna', license: 'CDL-A' },
  { id: '26', name: 'Tarango', license: 'CDL-A' },
  { id: '27', name: 'Sierra', license: 'CDL-A' },
  { id: '28', name: 'Chavez', license: 'CDL-A' },
];

const INITIAL_TRUCKS = [
  { id: '427', plate: '427', model: 'Heavy Duty', capacity: 'N/A' },
  { id: '1046', plate: '1046', model: 'Truck', capacity: 'N/A' },
  { id: '1047', plate: '1047', model: 'Truck', capacity: 'N/A' },
  { id: '1065', plate: '1065', model: 'Truck', capacity: 'N/A' },
  { id: '1082', plate: '1082', model: 'Truck', capacity: 'N/A' },
  { id: '4037', plate: '4037', model: 'Truck', capacity: 'N/A' },
  { id: '4064', plate: '4064', model: 'Truck', capacity: 'N/A' },
  { id: '4079', plate: '4079', model: 'Truck', capacity: 'N/A' },
  { id: '4080', plate: '4080', model: 'Truck', capacity: 'N/A' },
  { id: '4082', plate: '4082', model: 'Truck', capacity: 'N/A' },
  { id: '4098', plate: '4098', model: 'Truck', capacity: 'N/A' },
  { id: '4099', plate: '4099', model: 'Truck', capacity: 'N/A' },
  { id: '4113', plate: '4113', model: 'Water Tanker', capacity: '2000g' },
  { id: '4115', plate: '4115', model: 'Truck', capacity: 'N/A' },
  { id: '4124', plate: '4124', model: 'Truck', capacity: 'N/A' },
  { id: '4127', plate: '4127', model: 'Truck', capacity: 'N/A' },
  { id: '4132', plate: '4132', model: 'Truck', capacity: 'N/A' },
  { id: '4134', plate: '4134', model: 'Truck', capacity: 'N/A' },
  { id: '4145', plate: '4145', model: 'Truck', capacity: 'N/A' },
  { id: '4146', plate: '4146', model: 'Truck', capacity: 'N/A' },
  { id: '4147', plate: '4147', model: 'Truck', capacity: 'N/A' },
  { id: '4153', plate: '4153', model: 'Truck', capacity: 'N/A' },
  { id: '4155', plate: '4155', model: 'Truck', capacity: 'N/A' },
  { id: '4156', plate: '4156', model: 'Truck', capacity: 'N/A' },
  { id: '4157', plate: '4157', model: 'Truck', capacity: 'N/A' },
  { id: '4161', plate: '4161', model: 'Truck', capacity: 'N/A' },
  { id: '4164', plate: '4164', model: 'Truck', capacity: 'N/A' },
  { id: '4166', plate: '4166', model: 'Truck', capacity: 'N/A' },
  { id: '4167', plate: '4167', model: 'Truck', capacity: 'N/A' },
  { id: '4168', plate: '4168', model: 'Truck', capacity: 'N/A' },
  { id: '4169', plate: '4169', model: 'Truck', capacity: 'N/A' },
  { id: '4170', plate: '4170', model: 'Truck', capacity: 'N/A' },
  { id: '4171', plate: '4171', model: 'Truck', capacity: 'N/A' },
  { id: '4178', plate: '4178', model: 'Truck', capacity: 'N/A' },
];

const INITIAL_ROUTES = [
  { id: '1', name: 'Eastside Loop', distance: '45mi', estTime: '2h' },
  { id: '2', name: 'Airport Shuttle', distance: '12mi', estTime: '45m' },
  { id: '3', name: 'Valley Route', distance: '60mi', estTime: '3h' },
  { id: '4', name: 'West Side', distance: '30mi', estTime: '1.5h' },
  { id: '5', name: 'Downtown', distance: '15mi', estTime: '1h' },
];

export default function FleetApp() {
  // --- State ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [trucks, setTrucks] = useState<Vehicle[]>(INITIAL_TRUCKS);
  const [routes, setRoutes] = useState<Route[]>(INITIAL_ROUTES);
  const [dispatches, setDispatches] = useState<Dispatch[]>([]);
  const [showDispatchModal, setShowDispatchModal] = useState(false);

  // Form State
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedTruck, setSelectedTruck] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedShift, setSelectedShift] = useState<ShiftType>('Morning');

  // --- Persistence & Lifecycle ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('fleetData_v1');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // We only load dispatches from storage to keep drivers/trucks updated from code
        if (parsed.dispatches) setDispatches(parsed.dispatches);
        
        // Uncomment these if you want the app to REMEMBER added drivers/trucks 
        // over the hardcoded list above. 
        // if (parsed.drivers) setDrivers(parsed.drivers);
        // if (parsed.trucks) setTrucks(parsed.trucks);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fleetData_v1', JSON.stringify({ drivers, trucks, routes, dispatches }));
    }
  }, [drivers, trucks, routes, dispatches]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDispatches(prev => prev.map(d => {
        if (d.status === 'Active' && differenceInHours(now, new Date(d.startTime)) > 24) {
          return { ...d, status: 'Completed' };
        }
        return d;
      }));
    }, 60000); 
    return () => clearInterval(interval);
  }, []);

  // --- Helpers ---
  const activeCount = dispatches.filter(d => d.status === 'Active').length;
  const availableTrucksCount = trucks.length - activeCount;

  const availableDrivers = drivers.filter(d => !dispatches.find(disp => disp.status === 'Active' && disp.driverId === d.id));
  const availableTrucks = trucks.filter(t => !dispatches.find(disp => disp.status === 'Active' && disp.truckId === t.id));

  // --- Actions ---
  const handleDispatch = () => {
    if (!selectedDriver || !selectedTruck || !selectedRoute) return;

    const newDispatch: Dispatch = {
      id: Date.now().toString(),
      driverId: selectedDriver,
      truckId: selectedTruck,
      routeId: selectedRoute,
      shift: selectedShift,
      startTime: new Date().toISOString(),
      status: 'Active'
    };

    setDispatches([newDispatch, ...dispatches]);
    setShowDispatchModal(false);
    
    // Reset form
    setSelectedDriver('');
    setSelectedTruck('');
    setSelectedRoute('');
  };

  const completeShift = (id: string) => {
    setDispatches(dispatches.map(d => d.id === id ? { ...d, status: 'Completed' } : d));
  };

  const deleteRecord = (id: string) => {
    if(confirm("Delete this record permanently?")) {
      setDispatches(dispatches.filter(d => d.id !== id));
    }
  }

  const exportCSV = () => {
    const headers = "ID,Driver,Truck,Route,Shift,Start Time,Status\n";
    const rows = dispatches.map(d => {
      const dr = drivers.find(x => x.id === d.driverId)?.name || 'Unknown';
      const tr = trucks.find(x => x.id === d.truckId)?.plate || 'Unknown';
      const ro = routes.find(x => x.id === d.routeId)?.name || 'Unknown';
      return `${d.id},${dr},${tr},${ro},${d.shift},${d.startTime},${d.status}`;
    }).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fleet_history_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const resetData = () => {
    if(confirm("DANGER: This will wipe all app data and reset to defaults.")) {
      localStorage.removeItem('fleetData_v1');
      window.location.reload();
    }
  };

  // --- Components ---
  const StatusBadge = ({ status }: { status: string }) => (
    <span className={`px-2 py-1 rounded text-xs font-bold ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 sticky top-0 z-20 shadow-lg">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Truck className="w-6 h-6" /> FleetCmd
          </h1>
          <div className="text-xs bg-blue-800 px-2 py-1 rounded font-mono">v1.1</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-lg mx-auto">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in duration-300">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Active</p>
                <p className="text-4xl font-extrabold text-green-600 mt-1">{activeCount}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Ready</p>
                <p className="text-4xl font-extrabold text-blue-600 mt-1">{availableTrucksCount}</p>
              </div>
            </div>

            {/* Active List */}
            <h2 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wide flex items-center gap-2">
               On The Road
            </h2>
            
            <div className="space-y-3">
              {dispatches.filter(d => d.status === 'Active').length === 0 ? (
                <div className="text-center py-12 px-4 text-gray-400 bg-white rounded-xl border-2 border-dashed">
                  <Truck className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p>No trucks dispatched.</p>
                  <p className="text-xs mt-1">Tap + to assign a driver.</p>
                </div>
              ) : (
                dispatches.filter(d => d.status === 'Active').map(dispatch => {
                  const dr = drivers.find(d => d.id === dispatch.driverId);
                  const tr = trucks.find(t => t.id === dispatch.truckId);
                  const ro = routes.find(r => r.id === dispatch.routeId);
                  
                  return (
                    <div key={dispatch.id} className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500 relative">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{dr?.name}</h3>
                          <p className="text-gray-500 text-sm font-medium">Unit #{tr?.plate} <span className="text-gray-300">|</span> {tr?.model}</p>
                        </div>
                        <StatusBadge status="Active" />
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mb-4 grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-500" /> 
                          <span className="truncate">{ro?.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-500" /> 
                          <span>{dispatch.shift}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => completeShift(dispatch.id)}
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" /> Complete Shift
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* RECORDS TAB */}
        {activeTab === 'records' && (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">History</h2>
              <button onClick={exportCSV} className="flex items-center gap-1 text-sm bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold shadow-sm active:scale-95 transition">
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              {dispatches.filter(d => d.status === 'Completed').length === 0 && (
                 <div className="p-8 text-center text-gray-400">No history yet.</div>
              )}
              
              {dispatches.filter(d => d.status === 'Completed').sort((a,b) => b.startTime.localeCompare(a.startTime)).map(dispatch => {
                  const dr = drivers.find(d => d.id === dispatch.driverId);
                  const tr = trucks.find(t => t.id === dispatch.truckId);
                  const ro = routes.find(r => r.id === dispatch.routeId);
                  return (
                    <div key={dispatch.id} className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition flex justify-between items-center group">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-gray-800">{dr?.name}</p>
                          <span className="text-xs bg-gray-200 text-gray-600 px-1.5 rounded">{dispatch.shift}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {format(new Date(dispatch.startTime), 'MMM dd, HH:mm')} • {ro?.name}
                        </p>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                           <p className="font-mono text-sm font-bold text-blue-600">#{tr?.plate}</p>
                           <span className="text-[10px] uppercase text-gray-400">Completed</span>
                        </div>
                        <button onClick={() => deleteRecord(dispatch.id)} className="p-2 text-gray-300 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
              })}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold">Settings</h2>
            
            {/* Quick Stats */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-3 border-b pb-2">Fleet Data</h3>
              <div className="flex justify-between py-2">
                 <span>Drivers in system</span>
                 <span className="font-bold">{drivers.length}</span>
              </div>
              <div className="flex justify-between py-2">
                 <span>Trucks in system</span>
                 <span className="font-bold">{trucks.length}</span>
              </div>
            </div>

            <div className="bg-red-50 p-5 rounded-xl border border-red-100">
              <h3 className="text-red-800 font-bold mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> Danger Zone
              </h3>
              <p className="text-sm text-red-600 mb-4 opacity-80">
                Update applied? Click below to reload the new truck/driver list.
              </p>
              <button onClick={resetData} className="bg-white border border-red-200 text-red-600 px-4 py-3 rounded-lg w-full font-bold hover:bg-red-50 transition">
                Factory Reset & Reload Data
              </button>
            </div>
            
            <div className="text-center text-xs text-gray-400 mt-10">
              <p>FleetCmd PWA Build 1.1</p>
              <p>Local Storage Active</p>
            </div>
          </div>
        )}

      </main>

      {/* Floating Action Button (Only on Dashboard) */}
      {activeTab === 'dashboard' && (
        <button 
          onClick={() => setShowDispatchModal(true)}
          className="fixed bottom-24 right-5 bg-blue-600 text-white p-4 rounded-full shadow-xl shadow-blue-600/30 hover:bg-blue-700 active:scale-90 transition-all z-30"
        >
          <Plus className="w-8 h-8" />
        </button>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 p-2 pb-safe flex justify-around items-center z-40 safe-area-pb">
        <button onClick={() => setActiveTab('dashboard')} className={`p-3 rounded-xl flex flex-col items-center transition-all ${activeTab === 'dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-400'}`}>
          <Truck className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1">Dispatch</span>
        </button>
        <button onClick={() => setActiveTab('records')} className={`p-3 rounded-xl flex flex-col items-center transition-all ${activeTab === 'records' ? 'text-blue-600 bg-blue-50' : 'text-gray-400'}`}>
          <History className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1">History</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`p-3 rounded-xl flex flex-col items-center transition-all ${activeTab === 'settings' ? 'text-blue-600 bg-blue-50' : 'text-gray-400'}`}>
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1">Settings</span>
        </button>
      </nav>

      {/* Dispatch Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md sm:rounded-2xl rounded-t-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-20 duration-300">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-bold text-gray-800">New Dispatch</h2>
               <button onClick={() => setShowDispatchModal(false)} className="bg-gray-100 p-2 rounded-full"><X className="w-5 h-5 text-gray-600"/></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Route</label>
                <select className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 ring-blue-500 outline-none transition" value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)}>
                  <option value="">Select Route</option>
                  {routes.map(r => <option key={r.id} value={r.id}>{r.name} ({r.distance})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Driver</label>
                <select className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 ring-blue-500 outline-none transition" value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)}>
                  <option value="">Select Driver</option>
                  {availableDrivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  {availableDrivers.length === 0 && <option disabled>All drivers busy</option>}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Truck</label>
                <select className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 ring-blue-500 outline-none transition" value={selectedTruck} onChange={e => setSelectedTruck(e.target.value)}>
                  <option value="">Select Truck</option>
                  {availableTrucks.map(t => <option key={t.id} value={t.id}>#{t.plate} ({t.model})</option>)}
                  {availableTrucks.length === 0 && <option disabled>All trucks busy</option>}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Shift</label>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  {['Morning', 'Afternoon', 'Night'].map((s) => (
                    <button 
                      key={s}
                      onClick={() => setSelectedShift(s as ShiftType)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${selectedShift === s ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={handleDispatch} 
                disabled={!selectedDriver || !selectedTruck || !selectedRoute}
                className="w-full py-4 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-xl shadow-blue-200 hover:bg-blue-700 disabled:bg-gray-300 disabled:shadow-none transition-all"
              >
                Dispatch Truck
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}