// ServiceTitan API Types

export interface ServiceTitanConfig {
  clientId: string;
  clientSecret: string;
  tenantId: string;
  appKey: string;
  baseUrl?: string;
}

export interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  hasMore: boolean;
  page: number;
  pageSize: number;
  totalCount?: number;
}

export interface Job {
  id: number;
  jobNumber: string;
  customerId: number;
  locationId: number;
  businessUnitId: number;
  jobTypeId: number;
  priority: string;
  campaignId?: number;
  summary: string;
  createdOn: string;
  modifiedOn: string;
  completedOn?: string;
  jobStatus: string;
  startDate?: string;
  tagTypeIds?: number[];
}

export interface JobAppointment {
  id: number;
  jobId: number;
  appointmentNumber: string;
  start: string;
  end: string;
  arrivalWindowStart: string;
  arrivalWindowEnd: string;
  status: string;
  technicianIds: number[];
}

export interface Customer {
  id: number;
  active: boolean;
  name: string;
  type: string;
  address?: Address;
  customFields?: CustomField[];
  balance: number;
  createdOn: string;
  modifiedOn: string;
  phoneSettings?: PhoneSettings[];
  email?: string;
  doNotMail: boolean;
  doNotService: boolean;
}

export interface Contact {
  id: number;
  customerId: number;
  type: string;
  name: string;
  phoneNumbers?: PhoneNumber[];
  email?: string;
  memo?: string;
}

export interface Location {
  id: number;
  customerId: number;
  active: boolean;
  name: string;
  address: Address;
  taxZoneId?: number;
  zoneId?: number;
}

export interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
}

export interface PhoneNumber {
  type: string;
  number: string;
}

export interface PhoneSettings {
  phoneNumber: string;
  doNotText: boolean;
}

export interface CustomField {
  typeId: number;
  name: string;
  value: string;
}

export interface Invoice {
  id: number;
  syncStatus: string;
  summary: string;
  invoiceNumber: string;
  jobId: number;
  customerId: number;
  locationId: number;
  businessUnitId: number;
  batchId?: number;
  invoiceType: string;
  createdOn: string;
  modifiedOn: string;
  dueDate?: string;
  subtotal: number;
  tax: number;
  total: number;
  balance: number;
  status: string;
}

export interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  skuId?: number;
  skuName?: string;
  itemType: string;
  membershipTypeId?: number;
}

export interface Payment {
  id: number;
  invoiceId: number;
  amount: number;
  paymentType: string;
  status: string;
  memo?: string;
  createdOn: string;
  postedOn?: string;
}

export interface Estimate {
  id: number;
  jobId: number;
  projectId?: number;
  name: string;
  status: string;
  summary: string;
  createdOn: string;
  modifiedOn: string;
  soldOn?: string;
  soldBy?: number;
  subtotal: number;
  total: number;
}

export interface Technician {
  id: number;
  name: string;
  businessUnitId: number;
  active: boolean;
  email?: string;
  mobileNumber?: string;
  skillIds?: number[];
  employeeId?: string;
}

export interface TechnicianShift {
  id: number;
  technicianId: number;
  start: string;
  end: string;
  zoneId?: number;
}

export interface DispatchZone {
  id: number;
  name: string;
  active: boolean;
  businessUnitId: number;
}

export interface DispatchBoard {
  date: string;
  zoneId?: number;
  appointments: DispatchAppointment[];
  unscheduledJobs: Job[];
}

export interface DispatchAppointment {
  appointmentId: number;
  jobId: number;
  technicianId?: number;
  start: string;
  end: string;
  status: string;
  customerName: string;
  address: Address;
}

export interface Equipment {
  id: number;
  locationId: number;
  name: string;
  type: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  installDate?: string;
  warrantyExpiration?: string;
  active: boolean;
}

export interface Membership {
  id: number;
  customerId: number;
  locationId: number;
  membershipTypeId: number;
  status: string;
  from: string;
  to: string;
  cancellationDate?: string;
  cancellationReason?: string;
  recurringServiceEventId?: number;
}

export interface MembershipType {
  id: number;
  name: string;
  duration: number;
  billingFrequency: string;
  cost: number;
  active: boolean;
}

export interface RevenueReport {
  startDate: string;
  endDate: string;
  totalRevenue: number;
  invoiceRevenue: number;
  paymentRevenue: number;
  byBusinessUnit: BusinessUnitRevenue[];
  byJobType: JobTypeRevenue[];
}

export interface BusinessUnitRevenue {
  businessUnitId: number;
  businessUnitName: string;
  revenue: number;
}

export interface JobTypeRevenue {
  jobTypeId: number;
  jobTypeName: string;
  revenue: number;
  jobCount: number;
}

export interface TechnicianPerformance {
  technicianId: number;
  technicianName: string;
  startDate: string;
  endDate: string;
  jobsCompleted: number;
  revenue: number;
  averageTicket: number;
  hoursWorked: number;
}

export interface JobCosting {
  jobId: number;
  revenue: number;
  laborCost: number;
  materialCost: number;
  equipmentCost: number;
  totalCost: number;
  profit: number;
  profitMargin: number;
}

export interface CallTracking {
  id: number;
  callDate: string;
  phoneNumber: string;
  duration: number;
  callType: string;
  campaignId?: number;
  customerId?: number;
  jobId?: number;
  booked: boolean;
}

export interface Campaign {
  id: number;
  name: string;
  active: boolean;
  category: string;
  source?: string;
  medium?: string;
  createdOn: string;
}

export interface Lead {
  id: number;
  customerId?: number;
  campaignId?: number;
  status: string;
  createdOn: string;
  convertedOn?: string;
  source: string;
}

export interface LeadSource {
  source: string;
  leadCount: number;
  convertedCount: number;
  conversionRate: number;
  revenue: number;
}
