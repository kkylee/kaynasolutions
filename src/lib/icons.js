import {
  BarChart3,
  Boxes,
  Cloud,
  Code2,
  Compass,
  Contact,
  Facebook,
  GitBranch,
  LineChart,
  Linkedin,
  Plug,
  RefreshCw,
  Users,
  Workflow,
} from 'lucide-vue-next'

const registry = {
  BarChart3,
  Boxes,
  Cloud,
  Code2,
  Compass,
  Contact,
  Facebook,
  GitBranch,
  LineChart,
  Linkedin,
  Plug,
  RefreshCw,
  Users,
  Workflow,
}

export function icon(name) {
  return registry[name] ?? Compass
}
