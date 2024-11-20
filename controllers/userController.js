const UserService = require('../services/userService');
const ComplaintService = require('../services/complaintService');
const userService = new UserService();
const complaintService = new ComplaintService();

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
            const idComplaint = req.params.id;
            console.log(idComplaint); 
            const status = req.body;
            console.log(status);

            if (status === undefined) {
                return res.status(400).send({
                    estado: "Falla",
                    mensaje: "El campo estado no puede estar vacío"
                    
                })
            }

           const modifiedComplaint = await complaintService.updateComplaint(idComplaint, status);

           if (modifiedComplaint.estado) {
                res.status(200).send({estado: "OK", mensaje: modifiedComplaint.mensaje});
           }else{
                res.status(404).send({estado: "Falla con el id del reclamo", mensaje: modifiedComplaint.mensaje});
           }

        } catch (error) {
            console.error('Error en updateComplaintStatus:', error); // Log más detallado
            res.status(500).json({ error: 'Failed to update complaint status', detalle: error.message });
        }
        
    }

    async getEmployeeTasks(req, res) {
        try {
            const employeeId = req.user.id;
            const tasks = await userService.getTasksForEmployee(employeeId);
            const employee = await userService.findUserById(employeeId);
            //console.log(employee[0]);
            res.status(200).json(tasks[0]); // solo la respuesta, le saqué buffer y metadata
            console.log(`Los reclamos a cargo del empleado ${employee[0].nombre} ${employee[0].apellido} son:`)
            tasks[0].map(task => 
                console.log(`Oficina: ${task.nombre_oficina}
ID: ${task.idReclamo}
Descripción: ${task.nombre_oficina}
Creación: ${task.fechaCreado}
                    `));
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch tasks' 
                
            });
            // descomentar para error detallado
            console.log(error); 
        }
    }

    async manageComplaintTypes(req, res) {
        try {
            const complaintTypeData = req.body;
            console.log(complaintTypeData);
            const result = await userService.manageComplaintTypes(complaintTypeData);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to manage complaint types' });
            console.log(error);
        }
    }

    async getAdminStats(req, res) {
        try {
            const stats = await userService.getStatistics();
            res.status(200).json(stats);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch stats' });
        }
    }

    async downloadReport(req, res) {
        try {
            const { format } = req.params;
            const report = await userService.generateReport(format);
            if (!report) {
                return res.status(400).json({ error: 'Formato no soportado' });
            }
            res.setHeader('Content-Disposition', `attachment; filename=report.${format}`);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.send(report);
        } catch (error) {
            console.error('Error al descargar el reporte:', error);
            res.status(500).json({ error: 'Error al generar el reporte' });
        }
    }     
    
}

module.exports = new UserController();
