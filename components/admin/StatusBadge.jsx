export default function StatusBadge({ status }) {
    let colors = '';
    switch (status?.toLowerCase()) {
        case 'pending':
            colors = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            break;
        case 'confirmed':
            colors = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            break;
        case 'completed':
            colors = 'bg-green-500/20 text-green-400 border-green-500/30';
            break;
        case 'cancelled':
            colors = 'bg-red-500/20 text-red-400 border-red-500/30';
            break;
        default:
            colors = 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${colors}`}>
            {status || 'Unknown'}
        </span>
    );
}
