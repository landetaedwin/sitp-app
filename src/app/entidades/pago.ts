import { DocumentoOperadora } from './documentoOperadora'

export class Pago {
    codigoPago: number
    codigoDocumentoOperadora: number
    fechaPago: Date
    item: number
    valor: number
    numeroComprobante: string
    numeroTransaccion: string
    numeroFactura: string
    estado: number
    fechaRegistro: Date
    idUsuario: number
    documentoOperadora: DocumentoOperadora
}