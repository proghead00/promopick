-- CreateTable
CREATE TABLE "PromoItem" (
    "id" SERIAL NOT NULL,
    "promo_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoComments" (
    "id" SERIAL NOT NULL,
    "promo_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PromoItem" ADD CONSTRAINT "PromoItem_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "Promopick"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoComments" ADD CONSTRAINT "PromoComments_promo_id_fkey" FOREIGN KEY ("promo_id") REFERENCES "Promopick"("id") ON DELETE CASCADE ON UPDATE CASCADE;
