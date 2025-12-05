# Rust WASM 高效工具库

这是一个将 Rust 编译为 WebAssembly，为前端提供高性能计算能力的工具库，包含多个实用方法。

## 快速开始

### 在前端使用

### webpack 及 vite 中 plugin 相关依赖

```javascript
// vite在配置入口中引入"vite-plugin-wasm"以及"vite-plugin-top-level-await" plugin，提供wasm格式支持
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [wasm(), topLevelAwait()],
});

// webpack配置中注意，webpack版本为^5.97.0，需要引入"@wasm-tool/wasm-pack-plugin"
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const config = {
  plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "."),
    }),
  ],
};
```

### 使用方法

```javascript
let lib = import("mika-rust-lodash");
lib
  .then((wasm) => {
    const mod = wasm;
    console.log(
      // rust内所实现方法通过mod.xxx(...args)进行使用
      mod.quick_sort([
        4, 5, 6, 7, 2, 3, 5, 6, 8, 23, 4155, 6666, 4, 323123, 5, 9, -4,
      ])
    );
  })
  .catch(console.error);
```

### 前置要求

```bash
# 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 安装 wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

### 编译项目

```bash
# 安装wasm-bindgen-cli依赖
cargo install wasm-bindgen-cli

# build rust相关方法至wasm文件
cargo build --target=wasm32-unknown-unknown

# 通过wasm-bindgen构建js入口
wasm-bindgen target/wasm32-unknown-unknown/debug/mika-rust-lodash.wasm --out-dir ./pkg
```

## 功能列表

### 字符串处理

1. **字符串反转** - 高效反转任意长度字符串
2. **编辑距离计算** - Levenshtein 距离算法
3. **字符串压缩** - 简单 RLE 压缩算法
4. **Base64 编码** - 快速 Base64 编码
5. **文本相似度** - 基于余弦相似度的文本比较

### 数组处理

6. **快速排序** - 高性能排序算法
7. **二分搜索** - O(log n) 搜索算法
8. **数组去重** - 移除重复元素
9. **数组统计** - 计算均值、中位数、标准差等
10. **移动平均** - 时间序列数据处理

### 数学计算

11. **斐波那契数列** - 优化的迭代算法
12. **质数判断** - 高效质数检测
13. **快速幂运算** - 快速计算幂运算
14. **最大公约数 (GCD)** - 欧几里得算法
15. **最小公倍数 (LCM)** - 基于 GCD 的计算
16. **帕斯卡三角形** - 生成任意行数的帕斯卡三角形

### 矩阵与图像

17. **矩阵乘法** - 高效矩阵运算
18. **图像灰度化** - RGBA 图像处理

### 其他工具

19. **哈希计算** - 简单哈希函数
20. **JSON 验证** - 快速 JSON 格式验证

## 性能优势

与纯 JavaScript 实现相比，Rust WASM 版本在以下方面表现更优：

- **斐波那契计算**: 大数值计算快 2-5 倍
- **数组排序**: 大数组排序快 1.5-3 倍
- **字符串处理**: 长字符串操作快 2-4 倍
- **数学运算**: 密集计算快 3-10 倍

## 相关资源

- [Rust Book](https://doc.rust-lang.org/book/)
- [wasm-bindgen 文档](https://rustwasm.github.io/wasm-bindgen/)
- [WebAssembly 官网](https://webassembly.org/)
- [Rust and WebAssembly Book](https://rustwasm.github.io/docs/book/)
