const { CornService } = require('../services/cron-job.service')

const runCronJob = () => {
    CornService.startCronJob()
}

module.exports.CronnController = {
    runCronJob
}
