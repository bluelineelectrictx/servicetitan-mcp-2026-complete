import React, { useState } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function CustomerDetail() {
  const { callTool, loading, error } = useCallTool();
  const [customerId, setCustomerId] = useState('');
  const [customer, setCustomer] = useState<any>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  const loadCustomer = async () => {
    if (!customerId) return;
    try {
      const id = parseInt(customerId);
      const customerData = await callTool('servicetitan_get_customer', { customerId: id });
      setCustomer(customerData);
      
      const locsData = await callTool('servicetitan_list_customer_locations', { customerId: id });
      setLocations(locsData.data || []);
      
      const contactsData = await callTool('servicetitan_list_customer_contacts', { customerId: id });
      setContacts(contactsData.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>👤 Customer Detail</h1>
        <p>View complete customer profile</p>
      </div>

      <Card>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="number"
            className="input"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" onClick={loadCustomer}>Load Customer</button>
        </div>

        {loading && <div className="loading">Loading customer...</div>}
        {error && <div className="error">{error}</div>}

        {customer && (
          <>
            <h3>{customer.name} <Badge variant={customer.active ? 'success' : 'default'}>{customer.active ? 'Active' : 'Inactive'}</Badge></h3>
            <div className="grid grid-2" style={{ marginTop: '20px' }}>
              <div><strong>Type:</strong> {customer.type}</div>
              <div><strong>Email:</strong> {customer.email || '-'}</div>
              <div><strong>Balance:</strong> ${customer.balance?.toFixed(2) || '0.00'}</div>
              <div><strong>Do Not Mail:</strong> {customer.doNotMail ? 'Yes' : 'No'}</div>
              <div><strong>Do Not Service:</strong> {customer.doNotService ? 'Yes' : 'No'}</div>
              <div><strong>Created:</strong> {new Date(customer.createdOn).toLocaleString()}</div>
            </div>

            {locations.length > 0 && (
              <>
                <h3 style={{ marginTop: '30px' }}>Service Locations ({locations.length})</h3>
                <div className="grid grid-2">
                  {locations.map((loc: any) => (
                    <Card key={loc.id}>
                      <strong>{loc.name}</strong><br />
                      {loc.address?.street}<br />
                      {loc.address?.city}, {loc.address?.state} {loc.address?.zip}
                    </Card>
                  ))}
                </div>
              </>
            )}

            {contacts.length > 0 && (
              <>
                <h3 style={{ marginTop: '30px' }}>Contacts ({contacts.length})</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Email</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact: any) => (
                      <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.type}</td>
                        <td>{contact.email || '-'}</td>
                        <td>{contact.phoneNumbers?.[0]?.number || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
