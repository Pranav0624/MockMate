
/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://mock-mate_owner:p8b1XMHrZTxA@ep-delicate-math-a1cz21ye.ap-southeast-1.aws.neon.tech/mock-mate?sslmode=require',
  }
};
