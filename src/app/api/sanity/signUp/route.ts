import { signUpHandler } from "next-auth-sanity";
import { SanityClient } from "sanity";

import sanityClient from "@/libs/sanity";

export const POST = signUpHandler(sanityClient as SanityClient);
