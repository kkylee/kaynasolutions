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
      'Attendance logs come from a biometric device, leave requests arrive through chat, and payroll preparation starts with someone copying rows between three spreadsheets. At every cutoff, HR checks the same exceptions by hand and answers the same questions from staff. By the time the numbers are confirmed, payroll is already behind — and last month’s corrections have to be remembered rather than looked up.',
    solution:
      'The concept puts employee records, attendance, leave, and payroll-ready summaries in one place. Each employee has a single profile, and every module reads from it instead of keeping its own copy. Attendance imports from the device or a time log, leave balances update when a request is approved, and a dashboard lists exceptions — missing entries, overlapping leave, unapproved overtime — before payroll closes. Reports cover headcount, absence, and overtime by team. The cutoff becomes a review of flagged items rather than a rebuild from source files, and the history stays available when someone asks how a previous figure was reached.',
    stack: ['Vue 3', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    slug: 'inventory-management-system',
    name: 'Inventory Management System',
    category: 'Inventory & Operations',
    mockup: 'inventory',
    demo: true,
    problem:
      'Each branch keeps its own stock spreadsheet, and the warehouse keeps a third version that everyone treats as the real one. Availability is confirmed by calling someone who happens to be near the shelf, transfers are recorded when somebody remembers, and the month-end count becomes an argument about which file is correct. Fast-moving items run out while slow movers take up shelf space and cash.',
    solution:
      'The concept is built around movement rather than periodic counts. Receiving, issuing, transfers, and adjustments each create a record, so every balance has a history that can be traced to a person, a date, and a reason. Reorder points raise an alert when cover drops below a threshold, and a purchasing view shows what is already on order and which supplier is running late. Branch managers and the warehouse work from the same numbers, so the month-end count confirms the records instead of reconstructing them.',
    stack: ['Vue 3', 'Node.js', 'PostgreSQL', 'REST API'],
  },
  {
    slug: 'business-analytics-dashboard',
    name: 'Business Analytics Dashboard',
    category: 'Reporting',
    mockup: 'analytics',
    demo: true,
    problem:
      'Monthly reports start with exports from sales, stock, and attendance systems, then an afternoon of pasting and checking totals. Two departments often arrive at the meeting with different figures for the same week, and the discussion turns to whose file is right rather than what to do next. By the time the pack is finished, some of the decisions it was meant to inform have already been made.',
    solution:
      'The dashboard consolidates the three sources under shared definitions, so sales, average basket, stock cover, and absences mean the same thing wherever they appear. Daily cards show the current position, charts compare periods, and exceptions are listed rather than buried in rows. The same definitions feed the monthly pack, which means the review starts from one set of numbers. New questions are answered by opening a view instead of building another spreadsheet.',
    stack: ['Vue 3', 'TypeScript', 'Chart.js', 'PostgreSQL'],
  },
  {
    slug: 'workflow-approval-system',
    name: 'Workflow Approval System',
    category: 'Automation',
    mockup: 'approvals',
    demo: true,
    problem:
      'Purchase requests and leave approvals live in group chats and email threads. The status is hard to find, the trail is easy to lose, and the same request is often sent twice because nobody is sure whether the first one was seen. When someone asks who approved a payment, the answer depends on scrolling far enough back.',
    solution:
      'The concept gives every request a form, a route, and a visible status. Routing rules send each request to the right approver by department or amount, reminders follow anything left waiting, and each request keeps a timestamped history. Approved requests notify the team that acts next, so the handoff does not rely on a forwarded message. The record stays searchable afterwards, which makes audits and disputes a matter of reading rather than reconstructing from memory.',
    stack: ['Vue 3', 'Node.js', 'PostgreSQL', 'Webhooks'],
  },
  {
    slug: 'crm-client-management',
    name: 'CRM & Client Management System',
    category: 'Customer Management',
    mockup: 'crm',
    demo: true,
    problem:
      'Enquiries arrive through messaging apps, phone calls, email, and walk-ins. Some are written on paper, some live in a personal inbox, and follow-ups depend on whoever remembers to check that day. Promising leads go cold quietly, and when a salesperson leaves, the history leaves with them. Repeat customers are treated as new because nobody can see the earlier order.',
    solution:
      'A shared customer record where each enquiry, quotation, sale, and follow-up is logged once. Enquiries are assigned to a person with a due date, quotations attach to the customer, and activity reports show what is moving and what has stalled. Handovers become a matter of reading the record instead of asking around, and repeat business is easier to recognise because the history sits in one place. Managers can see pipeline value without requesting a separate report.',
    stack: ['Vue 3', 'Node.js', 'PostgreSQL', 'REST API'],
  },
]
