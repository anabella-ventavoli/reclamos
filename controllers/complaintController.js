const Complaints = require('../services/complaintService');
const complaints = new Complaints();

class ComplaintController {
    //obtener todos los reclamos
    async getAllComplaints(req, res) {
        try {
            const results = await complaints.getAll();
            res.status(200).json({
                status: 'exito',
                data: results,
            });
            results.map(reclamo  => {
                console.log(`idReclamo: ${reclamo.idReclamo}
Asunto: ${reclamo.asunto}
Descripción: ${reclamo.descripcion}
Creación: ${reclamo.fechaCreado}
Finalización: ${reclamo.fechaFinalizado}
Cancelación: ${reclamo.fechaCancelado}
Estado: ${reclamo.idReclamoEstado}
Tipo: ${reclamo.idReclamoTipo}
Usuario creador: ${reclamo.idUsuarioCreador}
Usuario finalizador: ${reclamo.idUsuarioFinalizador}\n`);
            });
        } catch (error) {
            console.error('Error al recuperar reclamos:', error);
            res.status(500).json({
                status: 'error',
                message: 'error al recuperar reclamos',
            });
        }
    }

    //obtener un reclamo por id
    async getComplaintById(req, res) {
        const { id } = req.params;

        try {
            const result = await complaints.getById(id);
            if (!result) {
                return res.status(404).json({
                    status: 'error',
                    message: 'reclamo no encontrado',
                });
            }

            res.status(200).json({
                status: 'exito',
                data: result,
            });
        } catch (error) {
            console.error('error al recuperar reclamo por ID:', error);
            res.status(500).json({
                status: 'error',
                message: 'error al recuperar el reclamo',
            });
        }
    }

    //obtener reclamo para cliente
    async getClientComplaints(req, res) {
        //const clientId = req.params.clientId; //descomentar para pruebas
        const clientId = req.user.id;
    
        try {
            const results = await complaints.getComplaintsByClient(clientId);
            if (results.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'no se encontraron reclamos para este cliente',
                });
            }
    
            res.status(200).json({
                status: 'exito',
                data: results,
            });
        } catch (error) {
            console.error('error al recuperar reclamo del cliente:', error);
            res.status(500).json({
                status: 'error',
                message: 'error al recuperar reclamo del cliente',
            });
        }
    }
    
    //agregar reclamo
    async addComplaint(req, res) {
        try {
            console.log(req.body);
            const userId = req.user.id;
            const newComplaint = req.body;
            const createdComplaint = await complaints.add(userId, newComplaint);
            
            res.status(201).json({
                status: 'Éxito',
                message: 'Reclamo creado con exito',
                data: createdComplaint
            });
        } catch (error) {
            console.error('Error al crear reclamo:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error al crear el reclamo'
            });
        }
    }

    //cancelar reclamo creado
    async cancelComplaint(req, res) {
        const clientId = req.user.id; 
        const { id } = req.params;  // Descomentar para pruebas
        try {
            const success = await complaints.cancelComplaint(id, clientId);
            if (!success) {
                return res.status(400).json({
                    status: 'error',
                    message: 'No se puede cancelar el reclamo. Verifique que sea el autor y que el reclamo esté activo.',
                });
            }

            res.status(200).json({
                status: 'exito',
                message: 'reclamo cancelado',
            });
        } catch (error) {
            console.error('error al cancelar reclamo:', error);
            res.status(500).json({
                status: 'error',
                message: 'error al cancelar el reclamo',
            });
        }
    }
 
    //eliminar un reclamo por id
    async delete(req, res) {
        const { id } = req.params;
        
        try {
            //ahora solo marca como eliminado pero no borra permanente de la bd
            const deleted = await complaints.markAsDeletedById(id);
            if (!deleted) {
                return res.status(404).json({
                    status: 'error',
                    message: 'reclamo no encontrado',
                });
            }
    
            res.status(200).json({
                status: 'exito',
                message: 'reclamo eliminado con éxito',
            });
        } catch (error) {
            console.error('error al eliminar reclamo:', error);
            res.status(500).json({
                status: 'error',
                message: 'error al eliminar reclamo',
            });
        }
    }


    //actualizar un reclamo
    async updateComplaint(req, res) {
        const {id} = req.params;
        const jsonBody = req.body;
        console.log(id);
        console.log(jsonBody);
        try {
            const success = await complaints.updateComplaint(id, jsonBody);
            if (!success) {
                return res.status(404).json({
                    status: 'error',
                    message: 'reclamo no encontrado o no se realizaron cambios',
                });
            }1

            res.status(200).json({
                status: 'exito',
                message: 'reclamo actualizado con exito',
            });
        } catch (error) {
            console.error('error al actualizar reclamo:', error);
            res.status(500).json({
                status: 'error',
                message: 'error al actualizar el reclamo',
            });
        }
    }
    
}

module.exports = ComplaintController;
