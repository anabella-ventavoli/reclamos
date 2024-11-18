const UserService = require('../services/userService');
const userService = new UserService();

class UserController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const token = await UserService.login(username, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }

    async createComplaint(req, res) {
        try {
            const userId = req.user.id;
            const { complaintData } = req.body;
            const newComplaint = await complaintService.add(userId, complaintData);
            res.status(201).json(newComplaint);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create complaint...' });
        }
    }
    

    async getComplaints(req, res) {
        try {
            const userId = req.user.id;
            const complaints = await userService.getComplaints(userId);
            res.status(200).json(complaints);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch complaints' });
        }
    }

    async updateComplaintStatus(req, res) {
        try {
            const complaintId = req.params.id;
            const { status } = req.body;
            const updatedComplaint = await UserService.updateComplaintStatus(complaintId, status);
            res.status(200).json(updatedComplaint);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update complaint status' });
        }
    }

    async getEmployeeTasks(req, res) {
        try {
            const employeeId = req.user.id;
            const tasks = await UserService.getTasksForEmployee(employeeId);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch tasks' });
        }
    }

    async manageComplaintTypes(req, res) {
        try {
            const { complaintTypeData } = req.body;
            const result = await UserService.manageComplaintTypes(complaintTypeData);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to manage complaint types' });
        }
    }

    async getAdminStats(req, res) {
        try {
            const stats = await UserService.getStatistics();
            res.status(200).json(stats);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch stats' });
        }
    }

    async downloadReport(req, res) {
        try {
            const { format } = req.params;
            const report = await UserService.downloadReport(format);
            res.setHeader('Content-Disposition', `attachment; filename=report.${format}`);
            res.send(report);
        } catch (error) {
            res.status(500).json({ error: 'Failed to download report' });
        }
    }
}

module.exports = new UserController();
