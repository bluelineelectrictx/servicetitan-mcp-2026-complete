import React, { useState } from 'react';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  category: 'labor' | 'material' | 'equipment';
}

export default function EstimateBuilder() {
  const [customerName, setCustomerName] = useState('');
  const [jobType, setJobType] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0, category: 'labor' },
  ]);
  const [taxRate, setTaxRate] = useState(8);
  const [discount, setDiscount] = useState(0);
  
  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      category: 'labor',
    };
    setLineItems([...lineItems, newItem]);
  };
  
  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };
  
  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };
  
  const subtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxableAmount = subtotal - discountAmount;
  const tax = (taxableAmount * taxRate) / 100;
  const total = taxableAmount + tax;
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'labor': return '👷';
      case 'material': return '🔧';
      case 'equipment': return '⚙️';
      default: return '📦';
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">📝 Estimate Builder</h1>
          <p className="text-gray-400">Create detailed estimates for customers</p>
        </div>
        
        {/* Customer & Job Info */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter customer name"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Job Type</label>
              <input
                type="text"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g., HVAC Installation"
              />
            </div>
          </div>
        </div>
        
        {/* Line Items */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Line Items</h3>
            <button
              onClick={addLineItem}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
            >
              + Add Item
            </button>
          </div>
          
          <div className="space-y-3">
            {lineItems.map((item, idx) => (
              <div key={item.id} className="bg-[#0f172a] rounded-lg p-4 border border-gray-700">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                      className="w-full bg-[#1e293b] border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Description"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <select
                      value={item.category}
                      onChange={(e) => updateLineItem(item.id, 'category', e.target.value)}
                      className="w-full bg-[#1e293b] border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="labor">👷 Labor</option>
                      <option value="material">🔧 Material</option>
                      <option value="equipment">⚙️ Equipment</option>
                    </select>
                  </div>
                  
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#1e293b] border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Qty"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#1e293b] border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Rate"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="col-span-1 text-right text-green-400 font-medium">
                    ${(item.quantity * item.rate).toFixed(2)}
                  </div>
                  
                  <div className="col-span-1 text-right">
                    {lineItems.length > 1 && (
                      <button
                        onClick={() => removeLineItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Calculations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Adjustments</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tax Rate (%)</label>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Discount (%)</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount ({discount}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-400">Tax ({taxRate}%):</span>
                <span className="text-white font-medium">${tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-700 pt-3 flex justify-between font-bold text-xl">
                <span className="text-white">Total:</span>
                <span className="text-green-400">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
            Save Estimate
          </button>
          <button className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
            Send to Customer
          </button>
          <button className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium">
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}
