import { createClient } from '@supabase/supabase-js'

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validasi environment variables di build time
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
}
if (!supabaseServiceKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
}
if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

/**
 * Server Client - Untuk Server Components dan API Routes
 * Menggunakan Service Role Key (melewati RLS)
 * HANYA digunakan di server-side!
 */
export const supabaseServer = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: {
      schema: 'public',
    },
  }
)

/**
 * Browser Client - Untuk Client Components
 * Menggunakan Anon Key (mengikuti RLS policies)
 */
export const supabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
)

/**
 * Helper untuk mendapatkan client dengan cookie context (jika diperlukan)
 */
export const getSupabaseServerClient = (cookies?: string) => {
  return createClient(
    supabaseUrl,
    supabaseServiceKey,
    {
      auth: {
        persistSession: false,
      },
      global: {
        headers: cookies ? { Cookie: cookies } : undefined,
      },
    }
  )
}