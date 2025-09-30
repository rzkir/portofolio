/**
 * Format waktu relatif berdasarkan createdAt
 * - Jika kurang dari 24 jam: menampilkan "X menit yang lalu" atau "X jam yang lalu"
 * - Jika lebih dari 24 jam: menampilkan format tanggal "30 September 2025 at 9:11"
 */
export function formatRelativeTime(createdAt: string): string {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInMs = now.getTime() - createdDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // Jika kurang dari 24 jam (1440 menit)
    if (diffInMinutes < 1440) {
        if (diffInMinutes < 60) {
            return `${diffInMinutes} menit yang lalu`;
        } else {
            return `${diffInHours} jam yang lalu`;
        }
    }

    // Jika lebih dari 24 jam, tampilkan format tanggal
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
    };

    return createdDate.toLocaleDateString('id-ID', options);
}
