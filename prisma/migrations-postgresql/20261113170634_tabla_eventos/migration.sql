-- CreateTable
CREATE TABLE "eventos" (
    "id" SERIAL NOT NULL,
    "tabla" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "ip" TEXT DEFAULT '',
    "descripcion" TEXT DEFAULT '',
    "datosAntes" JSONB,
    "datosDespues" JSONB,
    "borrado" BOOLEAN NOT NULL DEFAULT false,
    "id_objeto" INTEGER NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);
