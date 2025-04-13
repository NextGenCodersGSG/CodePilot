import LogsRepository  from "../repositories/logs.repo";

class CountLogsService {

    async deleteUserFromLogs(id: string) {
        return await LogsRepository.deleteUserFromLogs(id);
    }
}

export default new CountLogsService();