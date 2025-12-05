/* tslint:disable */
/* eslint-disable */

export class ArrayStats {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  mean: number;
  median: number;
  std_dev: number;
  min: number;
  max: number;
}

export function array_statistics(arr: Float64Array): ArrayStats;

export function base64_encode(input: string): string;

export function binary_search(arr: Float64Array, target: number): number;

export function compress_string(s: string): string;

export function fast_power(base: number, exp: number): number;

export function fibonacci(n: number): bigint;

export function gcd(a: bigint, b: bigint): bigint;

export function grayscale_image(data: Uint8Array): Uint8Array;

export function is_prime(n: bigint): boolean;

export function lcm(a: bigint, b: bigint): bigint;

export function levenshtein_distance(s1: string, s2: string): number;

export function main(): void;

export function matrix_multiply(a: Float64Array, a_rows: number, a_cols: number, b: Float64Array, b_cols: number): Float64Array;

export function moving_average(arr: Float64Array, window: number): Float64Array;

export function pascal_triangle(rows: number): Float64Array;

export function quick_sort(arr: Float64Array): Float64Array;

export function reverse_string(s: string): string;

export function simple_hash(input: string): string;

export function text_similarity(text1: string, text2: string): number;

export function unique_array(arr: Float64Array): Float64Array;

export function validate_json(s: string): boolean;
