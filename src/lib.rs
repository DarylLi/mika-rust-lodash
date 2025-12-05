use wasm_bindgen::prelude::*;

// 1. 高性能字符串反转
#[wasm_bindgen]
pub fn reverse_string(s: &str) -> String {
    s.chars().rev().collect()
}

// 2. 快速排序数组
#[wasm_bindgen]
pub fn quick_sort(arr: &[f64]) -> Vec<f64> {
    let mut result = arr.to_vec();
    result.sort_by(|a, b| a.partial_cmp(b).unwrap());
    result
}

// 3. 计算斐波那契数列（优化版本）
#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u64 {
    if n <= 1 {
        return n as u64;
    }
    let mut a = 0u64;
    let mut b = 1u64;
    for _ in 2..=n {
        let temp = a + b;
        a = b;
        b = temp;
    }
    b
}

// 4. SHA256 哈希模拟（简化版）
#[wasm_bindgen]
pub fn simple_hash(input: &str) -> String {
    let hash: u64 = input.bytes().fold(0, |acc, b| {
        acc.wrapping_mul(31).wrapping_add(b as u64)
    });
    format!("{:016x}", hash)
}

// 5. 图像数据灰度化处理
#[wasm_bindgen]
pub fn grayscale_image(data: &[u8]) -> Vec<u8> {
    let mut result = Vec::with_capacity(data.len());
    for chunk in data.chunks(4) {
        if chunk.len() == 4 {
            let gray = (0.299 * chunk[0] as f32 
                      + 0.587 * chunk[1] as f32 
                      + 0.114 * chunk[2] as f32) as u8;
            result.extend_from_slice(&[gray, gray, gray, chunk[3]]);
        }
    }
    result
}

// 6. 二进制搜索
#[wasm_bindgen]
pub fn binary_search(arr: &[f64], target: f64) -> i32 {
    let mut left = 0;
    let mut right = arr.len() as i32 - 1;
    
    while left <= right {
        let mid = left + (right - left) / 2;
        let mid_val = arr[mid as usize];
        
        if (mid_val - target).abs() < f64::EPSILON {
            return mid;
        } else if mid_val < target {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    -1
}

// 7. 字符串编辑距离（Levenshtein距离）
#[wasm_bindgen]
pub fn levenshtein_distance(s1: &str, s2: &str) -> usize {
    let len1 = s1.chars().count();
    let len2 = s2.chars().count();
    let mut matrix = vec![vec![0; len2 + 1]; len1 + 1];

    for i in 0..=len1 {
        matrix[i][0] = i;
    }
    for j in 0..=len2 {
        matrix[0][j] = j;
    }

    let s1_chars: Vec<char> = s1.chars().collect();
    let s2_chars: Vec<char> = s2.chars().collect();

    for i in 1..=len1 {
        for j in 1..=len2 {
            let cost = if s1_chars[i - 1] == s2_chars[j - 1] { 0 } else { 1 };
            matrix[i][j] = (matrix[i - 1][j] + 1)
                .min(matrix[i][j - 1] + 1)
                .min(matrix[i - 1][j - 1] + cost);
        }
    }

    matrix[len1][len2]
}

// 8. 质数判断
#[wasm_bindgen]
pub fn is_prime(n: u64) -> bool {
    if n <= 1 {
        return false;
    }
    if n <= 3 {
        return true;
    }
    if n % 2 == 0 || n % 3 == 0 {
        return false;
    }
    
    let mut i = 5;
    while i * i <= n {
        if n % i == 0 || n % (i + 2) == 0 {
            return false;
        }
        i += 6;
    }
    true
}

// 9. 数组去重
#[wasm_bindgen]
pub fn unique_array(arr: &[f64]) -> Vec<f64> {
    let mut result = Vec::new();
    for &num in arr {
        if !result.iter().any(|x| (x - num).abs() < f64::EPSILON) {
            result.push(num);
        }
    }
    result
}

// 10. 矩阵乘法
#[wasm_bindgen]
pub fn matrix_multiply(a: &[f64], a_rows: usize, a_cols: usize, 
                       b: &[f64], b_cols: usize) -> Vec<f64> {
    let mut result = vec![0.0; a_rows * b_cols];
    
    for i in 0..a_rows {
        for j in 0..b_cols {
            let mut sum = 0.0;
            for k in 0..a_cols {
                sum += a[i * a_cols + k] * b[k * b_cols + j];
            }
            result[i * b_cols + j] = sum;
        }
    }
    result
}

// 11. 快速幂运算
#[wasm_bindgen]
pub fn fast_power(base: f64, exp: i32) -> f64 {
    if exp == 0 {
        return 1.0;
    }
    
    let mut result = 1.0;
    let mut b = base;
    let mut e = exp.abs();
    
    while e > 0 {
        if e % 2 == 1 {
            result *= b;
        }
        b *= b;
        e /= 2;
    }
    
    if exp < 0 {
        1.0 / result
    } else {
        result
    }
}

// 12. Base64 编码
#[wasm_bindgen]
pub fn base64_encode(input: &str) -> String {
    const CHARSET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let bytes = input.as_bytes();
    let mut result = String::new();
    
    for chunk in bytes.chunks(3) {
        let b1 = chunk[0];
        let b2 = chunk.get(1).copied().unwrap_or(0);
        let b3 = chunk.get(2).copied().unwrap_or(0);
        
        result.push(CHARSET[(b1 >> 2) as usize] as char);
        result.push(CHARSET[(((b1 & 0x03) << 4) | (b2 >> 4)) as usize] as char);
        result.push(if chunk.len() > 1 {
            CHARSET[(((b2 & 0x0F) << 2) | (b3 >> 6)) as usize] as char
        } else {
            '='
        });
        result.push(if chunk.len() > 2 {
            CHARSET[(b3 & 0x3F) as usize] as char
        } else {
            '='
        });
    }
    result
}

// 13. 数组统计信息
#[wasm_bindgen]
pub struct ArrayStats {
    pub mean: f64,
    pub median: f64,
    pub std_dev: f64,
    pub min: f64,
    pub max: f64,
}

#[wasm_bindgen]
pub fn array_statistics(arr: &[f64]) -> ArrayStats {
    if arr.is_empty() {
        return ArrayStats {
            mean: 0.0,
            median: 0.0,
            std_dev: 0.0,
            min: 0.0,
            max: 0.0,
        };
    }
    
    let sum: f64 = arr.iter().sum();
    let mean = sum / arr.len() as f64;
    
    let mut sorted = arr.to_vec();
    sorted.sort_by(|a, b| a.partial_cmp(b).unwrap());
    let median = if sorted.len() % 2 == 0 {
        (sorted[sorted.len() / 2 - 1] + sorted[sorted.len() / 2]) / 2.0
    } else {
        sorted[sorted.len() / 2]
    };
    
    let variance: f64 = arr.iter().map(|x| (x - mean).powi(2)).sum::<f64>() / arr.len() as f64;
    let std_dev = variance.sqrt();
    
    let min = *sorted.first().unwrap();
    let max = *sorted.last().unwrap();
    
    ArrayStats { mean, median, std_dev, min, max }
}

// 14. 字符串压缩（简单 RLE）
#[wasm_bindgen]
pub fn compress_string(s: &str) -> String {
    if s.is_empty() {
        return String::new();
    }
    
    let mut result = String::new();
    let chars: Vec<char> = s.chars().collect();
    let mut count = 1;
    
    for i in 1..chars.len() {
        if chars[i] == chars[i - 1] {
            count += 1;
        } else {
            result.push(chars[i - 1]);
            result.push_str(&count.to_string());
            count = 1;
        }
    }
    result.push(*chars.last().unwrap());
    result.push_str(&count.to_string());
    
    if result.len() < s.len() {
        result
    } else {
        s.to_string()
    }
}

// 15. JSON 验证（简单版）
#[wasm_bindgen]
pub fn validate_json(s: &str) -> bool {
    serde_json::from_str::<serde_json::Value>(s).is_ok()
}

// 16. 计算数组的移动平均
#[wasm_bindgen]
pub fn moving_average(arr: &[f64], window: usize) -> Vec<f64> {
    if window == 0 || window > arr.len() {
        return vec![];
    }
    
    let mut result = Vec::with_capacity(arr.len() - window + 1);
    
    for i in 0..=arr.len() - window {
        let sum: f64 = arr[i..i + window].iter().sum();
        result.push(sum / window as f64);
    }
    result
}

// 17. 最大公约数
#[wasm_bindgen]
pub fn gcd(mut a: u64, mut b: u64) -> u64 {
    while b != 0 {
        let temp = b;
        b = a % b;
        a = temp;
    }
    a
}

// 18. 最小公倍数
#[wasm_bindgen]
pub fn lcm(a: u64, b: u64) -> u64 {
    if a == 0 || b == 0 {
        return 0;
    }
    (a * b) / gcd(a, b)
}

// 19. 帕斯卡三角形生成
#[wasm_bindgen]
pub fn pascal_triangle(rows: usize) -> Vec<f64> {
    let mut result = Vec::new();
    
    for i in 0..rows {
        let mut row = vec![1.0];
        for j in 1..i {
            let val = result[(i - 1) * i / 2 + j - 1] + result[(i - 1) * i / 2 + j];
            row.push(val);
        }
        if i > 0 {
            row.push(1.0);
        }
        result.extend(row);
    }
    result
}

// 20. 文本相似度计算（余弦相似度）
#[wasm_bindgen]
pub fn text_similarity(text1: &str, text2: &str) -> f64 {
    use std::collections::HashMap;
    
    let words1: Vec<&str> = text1.split_whitespace().collect();
    let words2: Vec<&str> = text2.split_whitespace().collect();
    
    let mut freq1 = HashMap::new();
    let mut freq2 = HashMap::new();
    
    for word in words1 {
        *freq1.entry(word).or_insert(0) += 1;
    }
    for word in words2 {
        *freq2.entry(word).or_insert(0) += 1;
    }
    
    let mut dot_product = 0.0;
    let mut mag1 = 0.0;
    let mut mag2 = 0.0;
    
    for (word, count1) in &freq1 {
        let count2 = freq2.get(word).unwrap_or(&0);
        dot_product += (*count1 as f64) * (*count2 as f64);
        mag1 += (*count1 as f64).powi(2);
    }
    
    for count2 in freq2.values() {
        mag2 += (*count2 as f64).powi(2);
    }
    
    if mag1 == 0.0 || mag2 == 0.0 {
        0.0
    } else {
        dot_product / (mag1.sqrt() * mag2.sqrt())
    }
}

// 初始化函数
#[wasm_bindgen(start)]
pub fn main() {
    println!("Rust WASM 工具库已加载！");
}
