import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "5ymdorgd",
  dataset: "production",
  apiVersion: "v2021-10-21",
  token:
    "sk4EBUzcXUmxMFXzYjbiHWEDPdEAP2mbmpZ1p8UQ3eJogjW100Z7lDdPulirrNWG952xiO8BATznQuUho1XeV4gPUZArUqncCLzH9oHgPHSfKeD7b7EZ3bxcqRKt2GuvR1gsn1CnR1kytJRVKOGGQwjhXXEFBruMAbg0qUVXxBwTcuL4KW7U",
  useCdn: false,
});
