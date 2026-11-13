ALTER TABLE "Producto"
ALTER COLUMN "disponible" DROP DEFAULT,
ALTER COLUMN "disponible" TYPE BOOLEAN USING ("disponible"::BOOLEAN),
ALTER COLUMN "disponible" SET DEFAULT true;
