import { Request, Response } from 'express'

export class HomeHttpHandler {
  /**
     * @return {Response} res -> Response of server
     */
  getPing (_req: Request, res: Response): Response {
    return res.status(200).json({
      ok: true,
      message: 'pong'
    })
  }
}
