import React from 'react';
import './ExcelClaims.css';

const claims = [
  {
    number: '01',
    title: 'Fast Delivery',
    desc: 'We ensure on-time delivery of electrical, plumbing, and solar materials across all regions.',
    color: '#FF7A00',
  },
  {
    number: '02',
    title: 'Expert Support',
    desc: 'Our team offers expert guidance on selecting the right materials for your needs.',
    color: '#469EFF',
  },
  {
    number: '03',
    title: 'Quality Assurance',
    desc: 'Every item is verified for industry standards before it reaches your site.',
    color: '#F8A51B',
  },
  {
    number: '04',
    title: 'Wide Inventory',
    desc: 'From solar kits to plumbing pipes, we stock everything under one roof.',
    color: '#A5A5A5',
  },
  {
    number: '05',
    title: 'Customer Satisfaction',
    desc: 'Our support team ensures satisfaction even after delivery and installation.',
    color: '#2AD786',
  },
];

function ExcelClaims() {
  return (
    <div className="excel-section">
      <h2>
        How we claim to <span>excel?</span>
      </h2>
      <div className="claims-grid">
        {claims.map((item, idx) => (
          <div className="claim-card" key={idx}>
            <div className="claim-header" style={{ color: item.color }}>
              <span className="claim-number">{item.number}</span>
              <span className="claim-icon">{item.icon}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExcelClaims;
