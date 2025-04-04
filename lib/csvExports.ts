export function generateCsv<T>(data: T[]): string {
    if (data.length === 0) return "";

    // Convert Mongoose documents to plain objects
    const jsonData = data.map(item => (item as any).toObject?.() ?? item);

    const headers = Object.keys(jsonData[0]);
    const rows = jsonData.map(row =>
        headers.map(header =>
            `"${(row[header] ?? "").toString().replace(/"/g, '""')}"`
        ).join(",")
    );

    return [headers.join(","), ...rows].join("\r\n");
}