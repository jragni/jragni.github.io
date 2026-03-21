/**
 * Motion type utilities
 *
 * framer-motion v12 no longer exports `Variants` directly.
 * We define a compatible type here for use across components.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Variants = Record<string, any>
