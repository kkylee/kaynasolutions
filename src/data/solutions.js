export const solutions = [
  {
    slug: 'hr-employee-management',
    icon: 'Users',
    title: 'HR & Employee Management',
    mockup: 'hr',
    problem:
      'Attendance, leave, and employee records live in spreadsheets that only one person fully understands.',
    approach:
      'Build one employee record that attendance, leave, and reporting all read from, then give staff a simple portal for the requests they make every week.',
    howItWorks: [
      'Employees file leave and check balances from a portal.',
      'Attendance imports from the biometric device or time logs.',
      'HR reviews exceptions and exports payroll-ready summaries.',
      'Headcount, absence, and overtime reports stay current.',
    ],
    benefits: [
      'Fewer payroll corrections at every cutoff',
      'Records that survive staff turnover',
      'Answers available without waiting for HR',
    ],
    cta: 'Talk about an HR system',
  },
  {
    slug: 'inventory-operations-management',
    icon: 'Boxes',
    title: 'Inventory & Operations Management',
    mockup: 'inventory',
    problem:
      'Stock is counted in notebooks or spreadsheets, so what the system says and what is on the shelf rarely match.',
    approach:
      'Track stock movements where they happen, with a clear view of what is available, reserved, and already on order.',
    howItWorks: [
      'Receiving and issuing update stock as they happen.',
      'Reorder points raise an alert before an item runs out.',
      'Purchase requests link to the supplier and the budget.',
      'Branch transfers and adjustments keep an audit trail.',
    ],
    benefits: [
      'Fewer stockouts on fast-moving items',
      'Less capital tied up in slow movers',
      'Counts that reconcile without a weekend of work',
    ],
    cta: 'Talk about inventory',
  },
  {
    slug: 'customer-client-management',
    icon: 'Contact',
    title: 'Customer & Client Management',
    mockup: 'crm',
    problem:
      'Customer history is spread across chat threads, notebooks, and one person’s memory.',
    approach:
      'A shared customer record with every enquiry, quotation, sale, and follow-up in one place.',
    howItWorks: [
      'Enquiries are logged once and assigned to a person.',
      'Quotations and sales attach to the customer record.',
      'Follow-ups appear as tasks with a due date.',
      'Activity reports show what is actually moving.',
    ],
    benefits: [
      'No customer is forgotten after the first message',
      'Handovers take minutes, not a long conversation',
      'Repeat business is easier to spot',
    ],
    cta: 'Talk about customer records',
  },
  {
    slug: 'workflow-approval-automation',
    icon: 'GitBranch',
    title: 'Workflow & Approval Automation',
    mockup: 'approvals',
    problem:
      'Approvals move through chat and email, and the answer disappears when someone scrolls too far.',
    approach:
      'Give each request a route, an owner, and a status anyone can see.',
    howItWorks: [
      'A request is filed from a form with the right fields.',
      'It routes to the approver by rule, amount, or department.',
      'Reminders go out when something sits too long.',
      'Approved requests notify the team that acts next.',
    ],
    benefits: [
      'Approvals do not depend on memory',
      'A defensible record of who approved what',
      'Less time chasing signatures',
    ],
    cta: 'Talk about approvals',
  },
  {
    slug: 'reporting-business-intelligence',
    icon: 'LineChart',
    title: 'Reporting & Business Intelligence',
    mockup: 'analytics',
    problem:
      'Reports are rebuilt every month from exports, and nobody is completely sure the numbers agree.',
    approach:
      'Consolidate the data once, then serve the same definitions to every report and dashboard.',
    howItWorks: [
      'Sales, stock, attendance, and cash data are consolidated.',
      'Shared definitions decide what each number means.',
      'Dashboards show daily and monthly views.',
      'Exceptions are highlighted rather than buried.',
    ],
    benefits: [
      'One version of the truth',
      'Month-end becomes a review, not a rebuild',
      'Trends visible before they become problems',
    ],
    cta: 'Talk about reporting',
  },
  {
    slug: 'connected-business-systems',
    icon: 'RefreshCw',
    title: 'Connected Business Systems',
    mockup: 'sync',
    problem:
      'Each department’s tool works on its own, but the business runs on copy-paste between them.',
    approach:
      'Connect the tools with integrations and scheduled syncs, keeping one system as the owner of each type of record.',
    howItWorks: [
      'Each record type gets one owning system.',
      'Changes flow to the other tools automatically.',
      'Conflicts are flagged for a person to decide.',
      'Sync failures alert the team instead of failing quietly.',
    ],
    benefits: [
      'No weekly export-and-import routine',
      'Fewer mismatched records',
      'New tools can join without a rebuild',
    ],
    cta: 'Talk about integrations',
  },
]
