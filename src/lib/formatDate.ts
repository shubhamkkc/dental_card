export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const d = new Date(dateString + 'T00:00:00');
  const M = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return d.getDate() + '-' + M[d.getMonth()] + '-' + d.getFullYear();
}
