import CountLogs from "@/DB/models/count-logs.model";

export class LogsRepository {
    async deleteUserFromLogs(email: string) {
        return await CountLogs.deleteOne({email: email});
    }
}
export default new LogsRepository();