import CountLogs from "@/DB/models/count-logs.model";

export class LogsRepository {
    async deleteUserFromLogs(userId: string) {
        return await CountLogs.deleteOne({userId});
    }
}
export default new LogsRepository();