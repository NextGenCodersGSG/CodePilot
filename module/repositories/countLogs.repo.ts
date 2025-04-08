import CountLogs from "@/DB/models/count-logs.model";

export class LogsRepository {
    async deleteUserFromCounts(email: string) {
        return await CountLogs.deleteOne({email});
    }
}
export default new LogsRepository();