'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

interface Room {
  id: number;
  name: string;
  type: string;
  acPrice: number;
  nonAcPrice: number;
  description: string;
  amenities: string;
  totalRooms: number;
  availableRooms: number;
  status: string;
  images: { id: number; url: string }[];
}

export default function AdminRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [form, setForm] = useState({
    name: '',
    type: 'Single',
    acPrice: '',
    nonAcPrice: '',
    description: '',
    amenities: '',
    totalRooms: '',
    availableRooms: '',
    status: 'available',
    images: '',
  });

  const fetchRooms = () => {
    fetch('/api/rooms')
      .then((r) => r.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const resetForm = () => {
    setForm({
      name: '',
      type: 'Single',
      acPrice: '',
      nonAcPrice: '',
      description: '',
      amenities: '',
      totalRooms: '',
      availableRooms: '',
      status: 'available',
      images: '',
    });
    setEditingRoom(null);
    setShowForm(false);
  };

  const openEdit = (room: Room) => {
    setForm({
      name: room.name,
      type: room.type,
      acPrice: room.acPrice.toString(),
      nonAcPrice: room.nonAcPrice.toString(),
      description: room.description,
      amenities: JSON.parse(room.amenities || '[]').join(', '),
      totalRooms: room.totalRooms.toString(),
      availableRooms: room.availableRooms.toString(),
      status: room.status,
      images: room.images.map((i) => i.url).join('\n'),
    });
    setEditingRoom(room);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      acPrice: parseFloat(form.acPrice),
      nonAcPrice: parseFloat(form.nonAcPrice),
      totalRooms: parseInt(form.totalRooms),
      availableRooms: parseInt(form.availableRooms),
      amenities: form.amenities.split(',').map((a) => a.trim()).filter(Boolean),
      images: form.images.split('\n').map((u) => u.trim()).filter(Boolean),
    };

    if (editingRoom) {
      await fetch(`/api/rooms/${editingRoom.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    fetchRooms();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this room?')) return;
    await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
    fetchRooms();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rooms</h1>
          <p className="text-gray-500">Manage room types, pricing, and availability</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="btn-primary"
        >
          + Add Room
        </button>
      </div>

      {/* Room Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingRoom ? 'Edit Room' : 'Add New Room'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Room Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    placeholder="e.g. Single Occupancy"
                  />
                </div>
                <div>
                  <label className="label">Room Type *</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="input-field"
                  >
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Triple">Triple</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Non-AC Price (₹/month) *</label>
                  <input
                    type="number"
                    required
                    value={form.nonAcPrice}
                    onChange={(e) => setForm({ ...form, nonAcPrice: e.target.value })}
                    className="input-field"
                    placeholder="6500"
                  />
                </div>
                <div>
                  <label className="label">AC Price (₹/month) *</label>
                  <input
                    type="number"
                    required
                    value={form.acPrice}
                    onChange={(e) => setForm({ ...form, acPrice: e.target.value })}
                    className="input-field"
                    placeholder="7500"
                  />
                </div>
              </div>
              <div>
                <label className="label">Description *</label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input-field"
                  rows={2}
                  placeholder="Short description of the room"
                />
              </div>
              <div>
                <label className="label">Amenities (comma-separated)</label>
                <input
                  value={form.amenities}
                  onChange={(e) => setForm({ ...form, amenities: e.target.value })}
                  className="input-field"
                  placeholder="Spacious room, WiFi, Study desk"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Total Rooms *</label>
                  <input
                    type="number"
                    required
                    value={form.totalRooms}
                    onChange={(e) => setForm({ ...form, totalRooms: e.target.value })}
                    className="input-field"
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="label">Available Rooms *</label>
                  <input
                    type="number"
                    required
                    value={form.availableRooms}
                    onChange={(e) => setForm({ ...form, availableRooms: e.target.value })}
                    className="input-field"
                    placeholder="3"
                  />
                </div>
              </div>
              <div>
                <label className="label">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="input-field"
                >
                  <option value="available">Available</option>
                  <option value="maintenance">Under Maintenance</option>
                </select>
              </div>
              <div>
                <label className="label">Image URLs (one per line)</label>
                <textarea
                  value={form.images}
                  onChange={(e) => setForm({ ...form, images: e.target.value })}
                  className="input-field"
                  rows={3}
                  placeholder="https://example.com/image1.jpg"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  {editingRoom ? 'Update Room' : 'Create Room'}
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rooms List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{room.name}</h3>
                  <span className="text-sm text-gray-500">{room.type}</span>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    room.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {room.status}
                </span>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <div className="text-xs text-gray-500">Non-AC</div>
                  <div className="font-bold text-gray-900">₹{room.nonAcPrice.toLocaleString()}</div>
                </div>
                <div className="bg-brand/5 rounded-lg px-3 py-2">
                  <div className="text-xs text-brand">AC</div>
                  <div className="font-bold text-brand">₹{room.acPrice.toLocaleString()}</div>
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <div className="text-xs text-gray-500">Available</div>
                  <div className="font-bold text-gray-900">
                    {room.availableRooms}/{room.totalRooms}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{room.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(room)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
