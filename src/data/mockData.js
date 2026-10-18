// Centralized sample data for JKM Enterprises Portal
// In production this would be replaced by API calls — structure is kept flat & serializable for easy migration.

export const inventoryItems = [
  { id: 'INV-001', name: 'Surface Cleaner 500ml', category: 'Surface Cleaners', sku: 'SC-500', stock: 420, reorderLevel: 100, unit: 'pcs', price: 85 },
  { id: 'INV-002', name: 'Surface Cleaner 1L', category: 'Surface Cleaners', sku: 'SC-1000', stock: 260, reorderLevel: 80, unit: 'pcs', price: 150 },
  { id: 'INV-003', name: 'Room Freshener - Aqua Breeze 200ml', category: 'Room Fresheners', sku: 'RF-AQ200', stock: 75, reorderLevel: 120, unit: 'pcs', price: 99 },
  { id: 'INV-004', name: 'Room Freshener - Lavender 200ml', category: 'Room Fresheners', sku: 'RF-LV200', stock: 310, reorderLevel: 100, unit: 'pcs', price: 99 },
  { id: 'INV-005', name: 'Drain Cleaner 500g', category: 'Drain Cleaners', sku: 'DC-500', stock: 190, reorderLevel: 60, unit: 'pcs', price: 120 },
  { id: 'INV-006', name: 'Toilet Cleaner 1L', category: 'Toilet Cleaners', sku: 'TC-1000', stock: 40, reorderLevel: 90, unit: 'pcs', price: 135 },
  { id: 'INV-007', name: 'Floor Cleaner - Lemon 1L', category: 'Floor Cleaners', sku: 'FC-LM1000', stock: 505, reorderLevel: 150, unit: 'pcs', price: 180 },
  { id: 'INV-008', name: 'Glass Cleaner 500ml', category: 'Glass Cleaners', sku: 'GC-500', stock: 130, reorderLevel: 50, unit: 'pcs', price: 90 },
];

export const rawMaterials = [
  { id: 'RM-001', name: 'Sodium Lauryl Ether Sulphate (SLES)', supplier: 'ChemSource Pvt Ltd', stock: 1200, unit: 'kg', pricePerUnit: 180, lastUpdated: '2026-10-10' },
  { id: 'RM-002', name: 'Hydrochloric Acid (Technical Grade)', supplier: 'Gujarat Chemicals', stock: 350, unit: 'ltr', pricePerUnit: 95, lastUpdated: '2026-10-12' },
  { id: 'RM-003', name: 'Fragrance Concentrate - Aqua', supplier: 'AromaTech Labs', stock: 80, unit: 'kg', pricePerUnit: 850, lastUpdated: '2026-10-08' },
  { id: 'RM-004', name: 'Caustic Soda (NaOH)', supplier: 'Alkali Industries', stock: 600, unit: 'kg', pricePerUnit: 72, lastUpdated: '2026-10-14' },
  { id: 'RM-005', name: 'PET Bottles 500ml', supplier: 'PackWell Polymers', stock: 15000, unit: 'pcs', pricePerUnit: 6.5, lastUpdated: '2026-10-15' },
  { id: 'RM-006', name: 'Label Rolls (Printed)', supplier: 'FlexiPrint Solutions', stock: 4200, unit: 'pcs', pricePerUnit: 1.2, lastUpdated: '2026-10-11' },
  { id: 'RM-007', name: 'Enzyme Blend DC-7', supplier: 'BioZyme India', stock: 45, unit: 'kg', pricePerUnit: 1250, lastUpdated: '2026-10-05' },
];

export const purchaseBills = [
  { id: 'PB-2026-101', supplier: 'ChemSource Pvt Ltd', date: '2026-10-02', type: 'GST', gstin: '24ABCDE1234F1Z5', taxableValue: 185000, cgst: 16650, sgst: 16650, total: 218300, status: 'Paid' },
  { id: 'PB-2026-102', supplier: 'PackWell Polymers', date: '2026-10-05', type: 'GST', gstin: '27FGHIJ5678K2Z3', taxableValue: 97500, cgst: 8775, sgst: 8775, total: 115050, status: 'Unpaid' },
  { id: 'PB-2026-103', supplier: 'Local Kirana Supplies', date: '2026-10-07', type: 'Non-GST', gstin: '-', taxableValue: 12400, cgst: 0, sgst: 0, total: 12400, status: 'Paid' },
  { id: 'PB-2026-104', supplier: 'Gujarat Chemicals', date: '2026-10-11', type: 'GST', gstin: '24KLMNO9012P3Z1', taxableValue: 33250, cgst: 2992.5, sgst: 2992.5, total: 39235, status: 'Partial' },
  { id: 'PB-2026-105', supplier: 'Shree Transport Co.', date: '2026-10-14', type: 'Non-GST', gstin: '-', taxableValue: 8600, cgst: 0, sgst: 0, total: 8600, status: 'Paid' },
  { id: 'PB-2026-106', supplier: 'AromaTech Labs', date: '2026-10-16', type: 'GST', gstin: '29QRSTU3456V4Z8', taxableValue: 68000, cgst: 6120, sgst: 6120, total: 80240, status: 'Unpaid' },
];

export const salesBills = [
  { id: 'SB-2026-201', client: 'Metro Retail Chain', date: '2026-10-03', type: 'GST', gstin: '27AAACM1234N1Z9', taxableValue: 245000, cgst: 22050, sgst: 22050, total: 289100, status: 'Paid' },
  { id: 'SB-2026-202', client: 'Sanjay General Store', date: '2026-10-06', type: 'Non-GST', gstin: '-', taxableValue: 18500, cgst: 0, sgst: 0, total: 18500, status: 'Paid' },
  { id: 'SB-2026-203', client: 'CleanPro Distributors', date: '2026-10-09', type: 'GST', gstin: '24BBBCC5678D2Z1', taxableValue: 132000, cgst: 11880, sgst: 11880, total: 155760, status: 'Unpaid' },
  { id: 'SB-2026-204', client: 'HomePlus Supermarket', date: '2026-10-12', type: 'GST', gstin: '29DDDEE9012F3Z7', taxableValue: 415000, cgst: 37350, sgst: 37350, total: 489700, status: 'Partial' },
  { id: 'SB-2026-205', client: 'Ravi Traders', date: '2026-10-15', type: 'Non-GST', gstin: '-', taxableValue: 9200, cgst: 0, sgst: 0, total: 9200, status: 'Unpaid' },
  { id: 'SB-2026-206', client: 'Zenith Hotels Group', date: '2026-10-17', type: 'GST', gstin: '07GGHHI3456J4Z2', taxableValue: 89000, cgst: 8010, sgst: 8010, total: 105020, status: 'Paid' },
];

export const orders = [
  { id: 'ORD-501', client: 'Metro Retail Chain', date: '2026-10-01', items: 12, value: 289100, status: 'Delivered', payment: 'Paid' },
  { id: 'ORD-502', client: 'CleanPro Distributors', date: '2026-10-05', items: 8, value: 155760, status: 'In Transit', payment: 'Pending' },
  { id: 'ORD-503', client: 'HomePlus Supermarket', date: '2026-10-08', items: 20, value: 489700, status: 'Processing', payment: 'Partial' },
  { id: 'ORD-504', client: 'Zenith Hotels Group', date: '2026-10-11', items: 5, value: 105020, status: 'Delivered', payment: 'Paid' },
  { id: 'ORD-505', client: 'Sanjay General Store', date: '2026-10-13', items: 3, value: 18500, status: 'Pending', payment: 'Pending' },
  { id: 'ORD-506', client: 'Ravi Traders', date: '2026-10-15', items: 4, value: 9200, status: 'Cancelled', payment: 'Refunded' },
  { id: 'ORD-507', client: 'Metro Retail Chain', date: '2026-10-16', items: 15, value: 342000, status: 'Processing', payment: 'Pending' },
];

export const clients = [
  { id: 'CL-001', name: 'Metro Retail Chain', contactPerson: 'Anita Desai', phone: '+91 98200 11223', email: 'orders@metroretail.in', city: 'Mumbai', gstin: '27AAACM1234N1Z9', creditLimit: 500000, outstanding: 342000, type: 'GST' },
  { id: 'CL-002', name: 'Sanjay General Store', contactPerson: 'Sanjay Mehta', phone: '+91 99870 45632', email: 'sanjay.gs@gmail.com', city: 'Pune', gstin: '-', creditLimit: 50000, outstanding: 0, type: 'Non-GST' },
  { id: 'CL-003', name: 'CleanPro Distributors', contactPerson: 'Vikram Singh', phone: '+91 90040 77889', email: 'vikram@cleanprodist.com', city: 'Ahmedabad', gstin: '24BBBCC5678D2Z1', creditLimit: 200000, outstanding: 155760, type: 'GST' },
  { id: 'CL-004', name: 'HomePlus Supermarket', contactPerson: 'Priya Nair', phone: '+91 98450 22113', email: 'purchase@homeplus.co.in', city: 'Bengaluru', gstin: '29DDDEE9012F3Z7', creditLimit: 750000, outstanding: 240000, type: 'GST' },
  { id: 'CL-005', name: 'Ravi Traders', contactPerson: 'Ravi Kumar', phone: '+91 91234 55667', email: 'ravitraders@outlook.com', city: 'Jaipur', gstin: '-', creditLimit: 30000, outstanding: 9200, type: 'Non-GST' },
  { id: 'CL-006', name: 'Zenith Hotels Group', contactPerson: 'Farhan Qureshi', phone: '+91 98111 90909', email: 'fm@zenithhotels.com', city: 'New Delhi', gstin: '07GGHHI3456J4Z2', creditLimit: 300000, outstanding: 0, type: 'GST' },
];

export const monthlySales = [
  { month: 'May', sales: 842000, purchases: 512000 },
  { month: 'Jun', sales: 913000, purchases: 560000 },
  { month: 'Jul', sales: 1024000, purchases: 618000 },
  { month: 'Aug', sales: 987000, purchases: 590000 },
  { month: 'Sep', sales: 1156000, purchases: 672000 },
  { month: 'Oct', sales: 1066520, purchases: 671425 },
];

export const categoryShare = [
  { name: 'Surface Cleaners', value: 34 },
  { name: 'Room Fresheners', value: 22 },
  { name: 'Drain Cleaners', value: 18 },
  { name: 'Floor Cleaners', value: 14 },
  { name: 'Others', value: 12 },
];
