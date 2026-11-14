export const projectsNote =
  'These are demonstration concepts built to show how Solvanta approaches common business problems. They are not client engagements and are not commercial products.'

export const projects = [
  {
    slug: 'employee-management-system',
    name: 'Employee Management System',
    category: 'HR & Operations',
    mockup: 'hr',
    demo: true,
    problem:
      'Attendance, leave, and payroll preparation are handled in separate spreadsheets, so every cutoff involves manual checking, corrections, and a long conversation with HR before the numbers can be confirmed.',
    solution:
      'The concept combines employee records, attendance import, leave requests, and payroll-ready summaries in one portal. Each employee has a single record, and every module reads from it. A dashboard highlights exceptions — missing time entries, overlapping leave, unapproved overtime — before payroll closes. Reports cover headcount, absence, and overtime by team, so the cutoff is a review rather than a rebuild.',
    stack: ['Vue 3', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    slug: 'inventory-management-system',
    name: 'Inventory Management System',
    category: 'Inventory & Operations',
    mockup: 'inventory',
    demo: true,
    problem:
      'Stock is tracked in a different spreadsheet per branch, so availability is usually confirmed by calling the warehouse and hoping the last count was recent.',
    solution:
      'A stock system built around movement rather than counts. Receiving, issuing, transfers, and adjustments each create a record, so the balance has a history. Reorder points raise an alert when cover drops below a threshold, and a purchasing view shows what is on order and which supplier is late. Branch managers see the same numbers as the warehouse, and every adjustment is traceable to a person and a reason.',
    stack: ['Vue 3', 'Node.js', 'PostgreSQL', 'REST API'],
  },
  {
    slug: 'business-analytics-dashboard',
    name: 'Business Analytics Dashboard',
    category: 'Reporting',
    mockup: 'analytics',
    demo: true,
    problem:
      'Monthly reports are assembled by exporting from three systems and reconciling the totals by hand, which takes days and still ends in an argument about which number is right.',
    solution:
      'A dashboard that consolidates sales, stock, and attendance under shared definitions. Daily cards show sales, average basket, stock cover, and absences; charts compare periods, and exceptions appear as a list rather than buried in a spreadsheet. The same definitions feed the monthly pack, so the review meeting starts from one set of numbers and spends its time on decisions instead of reconciliation.',
    stack: ['Vue 3', 'TypeScript', 'Chart.js', 'PostgreSQL'],
  },
  {
    slug: 'workflow-approval-system',
    name: 'Workflow Approval System',
    category: 'Automation',
    mockup: 'approvals',
    demo: true,
    problem:
      'Purchase requests and leave approvals happen in chat, where the status is hard to find, the trail is easy to lose, and the same request is often sent twice.',
    solution:
      'A request-and-route concept. Forms capture the details that matter, routing rules send each request to the correct approver by department or amount, and reminders follow anything left waiting. Each request carries a visible status and a timestamped history, so the answer is never buried in a thread. Approved requests notify the team that acts next, and the record stays searchable afterwards.',
    stack: ['Vue 3', 'Node.js', 'PostgreSQL', 'Webhooks'],
  },
  {
    slug: 'crm-client-management',
    name: 'CRM & Client Management System',
    category: 'Customer Management',
    mockup: 'crm',
    demo: true,
    problem:
      'Customer enquiries arrive through several channels, and follow-ups depend on whoever remembers to check the messages that day — so promising leads quietly go cold.',
    solution:
      'A shared customer record where each enquiry, quotation, sale, and follow-up is logged once. Enquiries are assigned to a person with a due date, quotations attach to the customer, and activity reports show what is moving and what has stalled. Handovers become a matter of reading the record rather than asking around, and repeat business is easier to recognise because the history is in one place.',
    stack: ['Vue 3', 'Node.js', 'PostgreSQL', 'REST API'],
  },
]
