import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Typography,
    Chip,
    IconButton,
    Tooltip,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { supabase } from '../../services/supabase';

const actionColors = {
    INSERT: 'success',
    UPDATE: 'warning',
    DELETE: 'error'
};

const formatDateTime = (dateString) => {
    try {
        return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Data inválida';
    }
};

const LogDetailsModal = ({ log, open, onClose }) => {
    if (!log) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Detalhes do Log</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Data/Hora</Typography>
                    <Typography>{formatDateTime(log.created_at)}</Typography>

                    <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>Usuário</Typography>
                    <Typography>{log.user?.profiles?.name || log.user?.email || 'Sistema'}</Typography>

                    <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>Ação</Typography>
                    <Chip
                        label={log.action}
                        color={actionColors[log.action] || 'default'}
                        size="small"
                    />

                    <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>Tabela</Typography>
                    <Typography>{log.table_name}</Typography>

                    {log.old_data && (
                        <>
                            <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>Dados Anteriores</Typography>
                            <pre style={{
                                backgroundColor: '#f5f5f5',
                                padding: '8px',
                                borderRadius: '4px',
                                overflow: 'auto'
                            }}>
                                {JSON.stringify(log.old_data, null, 2)}
                            </pre>
                        </>
                    )}

                    {log.new_data && (
                        <>
                            <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>Novos Dados</Typography>
                            <pre style={{
                                backgroundColor: '#f5f5f5',
                                padding: '8px',
                                borderRadius: '4px',
                                overflow: 'auto'
                            }}>
                                {JSON.stringify(log.new_data, null, 2)}
                            </pre>
                        </>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
};

const AuditLogViewer = () => {
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedLog, setSelectedLog] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('audit_logs')
                    .select(`
            *,
            user:user_id (
              id,
              email,
              profiles (
                name,
                role
              )
            )
          `)
                    .order('created_at', { ascending: false })
                    .range(page * rowsPerPage, (page + 1) * rowsPerPage - 1);

                if (error) throw error;
                setLogs(data);
            } catch (error) {
                console.error('Erro ao buscar logs:', error);
                setError('Não foi possível carregar os logs. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [page, rowsPerPage]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ m: 2 }}>
                {error}
            </Alert>
        );
    }

    const handleViewDetails = (log) => {
        setSelectedLog(log);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Logs de Auditoria
            </Typography>

            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Data/Hora</TableCell>
                                <TableCell>Usuário</TableCell>
                                <TableCell>Ação</TableCell>
                                <TableCell>Tabela</TableCell>
                                <TableCell>Detalhes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell>
                                        {formatDateTime(log.created_at)}
                                    </TableCell>
                                    <TableCell>
                                        {log.user?.profiles?.name || log.user?.email || 'Sistema'}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={log.action}
                                            color={actionColors[log.action] || 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{log.table_name}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Ver detalhes">
                                            <IconButton size="small" onClick={() => handleViewDetails(log)}>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={-1}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[10, 25, 50]}
                    />
                </TableContainer>
            </Paper>

            <LogDetailsModal
                log={selectedLog}
                open={Boolean(selectedLog)}
                onClose={() => setSelectedLog(null)}
            />
        </Box>
    );
};

export default AuditLogViewer;