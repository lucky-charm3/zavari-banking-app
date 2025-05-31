export const users = [
  {
    name: "Helen Method",
    phone: "+255712345678",
    pin: "1234",
    accounts: [
      { id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", name: "Main Account", balance: 105000 },
      { id: "b2c3d4e5-f6a7-8901-bcde-f2345678901", name: "Savings Account", balance: 30000 }
    ],
    transactions: [
      { id: "t1a2b3c4-d5e6-7890-abcd-ef1234567890", date: "15-05-23", amount: 50000, action: "RECEIVED", status: "SUCCEEDED" },
      { id: "t2b3c4d5-e6f7-8901-bcde-f2345678901", date: "18-05-23", amount: 20000, action: "TRANSFERRED", status: "SUCCEEDED" },
      { id: "t3c4d5e6-f7a8-9012-cdef-3456789012", date: "20-05-23", amount: 10000, action: "TRANSFERRED", status: "FAILED" }
    ]
  },
  {
    name: "John Doe",
    phone: "+255714567890",
    pin: "4321",
    accounts: [
      { id: "a7a8b9c0-d1e2-3456-f012-7890123456", name: "Main Account", balance: 200000 }
    ],
    transactions: [
      { id: "t7a8b9c0-d1e2-3456-f012-7890123456", date: "05-05-23", amount: 100000, action: "RECEIVED", status: "SUCCEEDED" },
      { id: "t8b9c0d1-e2f3-4567-0123-8901234567", date: "08-05-23", amount: 50000, action: "TRANSFERRED", status: "FAILED" },
      { id: "t9c0d1e2-f3a4-5678-1234-9012345678", date: "17-05-23", amount: 30000, action: "RECEIVED", status: "SUCCEEDED" }
    ]
  },
  {
    name: "Jane Smith",
    phone: "+255715678901",
    pin: "9876",
    accounts: [
      { id: "a0d1e2f3-a4b5-6789-2345-0123456789", name: "Main Account", balance: 175000 },
      { id: "b1e2f3a4-b5c6-7890-3456-1234567890", name: "Joint Account", balance: 50000 }
    ],
    transactions: [
      { id: "t0d1e2f3-a4b5-6789-2345-0123456789", date: "03-05-23", amount: 75000, action: "RECEIVED", status: "SUCCEEDED" },
      { id: "t1e2f3a4-b5c6-7890-3456-1234567890", date: "09-05-23", amount: 25000, action: "TRANSFERRED", status: "SUCCEEDED" },
      { id: "t2f3a4b5-c6d7-8901-4567-2345678901", date: "14-05-23", amount: 50000, action: "RECEIVED", status: "FAILED" }
    ]
  },
  {
    name: "Brian K",
    phone: "+255716789012",
    pin: "1111",
    accounts: [
      { id: "a3a4b5c6-d7e8-9012-5678-3456789012", name: "Main Account", balance: 300000 },
      { id: "b4b5c6d7-e8f9-0123-6789-4567890123", name: "Savings Account", balance: 80000 },
      { id: "c5c6d7e8-f9a0-1234-7890-5678901234", name: "Travel Account", balance: 15000 },
      { id: "d6d7e8f9-a0b1-2345-8901-6789012345", name: "Bills Account", balance: 10000 }
    ],
    transactions: [
      { id: "t3a4b5c6-d7e8-9012-5678-3456789012", date: "01-05-23", amount: 150000, action: "RECEIVED", status: "SUCCEEDED" },
      { id: "t4b5c6d7-e8f9-0123-6789-4567890123", date: "07-05-23", amount: 50000, action: "TRANSFERRED", status: "SUCCEEDED" },
      { id: "t5c6d7e8-f9a0-1234-7890-5678901234", date: "16-05-23", amount: 100000, action: "RECEIVED", status: "SUCCEEDED" }
    ]
  },
  {
    name: "Lisa M",
    phone: "+255717890123",
    pin: "2468",
    accounts: [
      { id: "a6e7f8a9-b0c1-2345-9012-7890123456", name: "Main Account", balance: 225000 }
    ],
    transactions: [
      { id: "t6e7f8a9-b0c1-2345-9012-7890123456", date: "04-05-23", amount: 125000, action: "RECEIVED", status: "SUCCEEDED" },
      { id: "t7f8a9b0-c1d2-3456-0123-8901234567", date: "11-05-23", amount: 50000, action: "TRANSFERRED", status: "FAILED" },
      { id: "t8a9b0c1-d2e3-4567-1234-9012345678", date: "13-05-23", amount: 75000, action: "RECEIVED", status: "SUCCEEDED" }
    ]
  },
  {
    name: "James P",
    phone: "+255718901234",
    pin: "1357",
    accounts: [
      { id: "a7b8c9d0-e1f2-3456-2345-0123456789", name: "Main Account", balance: 190000 },
      { id: "b8c9d0e1-f2a3-4567-3456-1234567890", name: "Savings Account", balance: 40000 }
    ],
    transactions: [
      { id: "t7b8c9d0-e1f2-3456-2345-0123456789", date: "06-05-23", amount: 90000, action: "RECEIVED", status: "SUCCEEDED" },
      { id: "t8c9d0e1-f2a3-4567-3456-1234567890", date: "12-05-23", amount: 40000, action: "TRANSFERRED", status: "SUCCEEDED" },
      { id: "t9d0e1f2-a3b4-5678-4567-2345678901", date: "18-05-23", amount: 60000, action: "RECEIVED", status: "FAILED" }
    ]
  },
  {
    name: "Sophia Z",
    phone: "+255719012345",
    pin: "0000",
    accounts: [
      { id: "a8e9f0a1-b2c3-4567-5678-3456789012", name: "Main Account", balance: 160000 },
      { id: "b9f0a1b2-c3d4-5678-6789-4567890123", name: "Kids Account", balance: 25000 },
      { id: "c0a1b2c3-d4e5-6789-7890-5678901234", name: "Savings Account", balance: 60000 }
    ],
    transactions: [
      { id: "t8e9f0a1-b2c3-4567-5678-3456789012", date: "02-05-23", amount: 60000, action: "RECEIVED", status: "SUCCEEDED" },
      { id: "t9f0a1b2-c3d4-5678-6789-4567890123", date: "10-05-23", amount: 25000, action: "TRANSFERRED", status: "SUCCEEDED" },
      { id: "t0a1b2c3-d4e5-6789-7890-5678901234", date: "15-05-23", amount: 40000, action: "RECEIVED", status: "SUCCEEDED" }
    ]
  },
  {
    name: "Victor R",
    phone: "+255720123456",
    pin: "2222",
    accounts: [
      { id: "a9a0b1c2-d3e4-5678-8901-6789012345", name: "Main Account", balance: 130000 },
      { id: "b0b1c2d3-e4f5-6789-9012-7890123456", name: "Emergency Fund", balance: 50000 }
    ],
    transactions: [
      { id: "t9a0b1c2-d3e4-5678-8901-6789012345", date: "08-05-23", amount: 80000, action: "RECEIVED", status: "SUCCEEDED" },
      { id: "t0b1c2d3-e4f5-6789-9012-7890123456", date: "14-05-23", amount: 30000, action: "TRANSFERRED", status: "FAILED" },
      { id: "t1c2d3e4-f5a6-7890-0123-8901234567", date: "19-05-23", amount: 50000, action: "RECEIVED", status: "SUCCEEDED" }
    ]
  },
  {
    name: "Aisha T",
    phone: "+255721234567",
    pin: "9999",
    accounts: [
      { id: "a1b2c3d4-e5f6-7890-1234-9012345678", name: "Main Account", balance: 270000 },
      { id: "b2c3d4e5-f6a7-8901-2345-0123456789", name: "Savings Account", balance: 100000 },
      { id: "c3d4e5f6-a7b8-9012-3456-1234567890", name: "Crypto Wallet", balance: 40000 }
    ],
    transactions: [
      { id: "t1b2c3d4-e5f6-7890-1234-9012345678", date: "09-05-23", amount: 120000, action: "RECEIVED", status: "SUCCEEDED" },
      { id: "t2c3d4e5-f6a7-8901-2345-0123456789", date: "13-05-23", amount: 70000, action: "TRANSFERRED", status: "SUCCEEDED" },
      { id: "t3d4e5f6-a7b8-9012-3456-1234567890", date: "17-05-23", amount: 80000, action: "RECEIVED", status: "FAILED" }
    ]
  }
];