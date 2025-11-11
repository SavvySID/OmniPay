/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	// Disable trace file to avoid Windows EPERM errors
	experimental: {
		outputFileTracingExcludes: {
			'*': [],
		},
	},
	// Disable telemetry to reduce file operations
	telemetry: false,
  webpack: (config, { isServer }) => {
    // Fix for MetaMask SDK trying to import React Native packages in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@react-native-async-storage/async-storage': false,
        'react-native': false,
      };
    }

    // Ignore React Native modules in browser environment
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
    };

    // Fix for viem import.meta issue
    // The CommonJS build of viem uses import.meta which webpack can't parse
    // We'll use a webpack plugin to transform the source before parsing
    if (!isServer) {
      const webpack = require('webpack');
      config.plugins = config.plugins || [];
      
      // Create a custom plugin to replace import.meta.webpackHot.accept()
      class ImportMetaFixPlugin {
        apply(compiler) {
          compiler.hooks.normalModuleFactory.tap('ImportMetaFixPlugin', (nmf) => {
            nmf.hooks.beforeResolve.tap('ImportMetaFixPlugin', (data) => {
              if (data.request && data.request.includes('viem/_cjs/index.js')) {
                // This will be handled by the loader below
              }
            });
          });
        }
      }
      
      config.plugins.push(new ImportMetaFixPlugin());
      
      // Add a loader to transform import.meta.webpackHot.accept() to a comment
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      config.module.rules.push({
        test: /node_modules\/viem\/_cjs\/index\.js$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: 'import\\.meta\\.webpackHot\\.accept\\(\\);',
            replace: '// import.meta.webpackHot.accept(); // Removed for webpack compatibility',
            flags: 'g',
          },
        },
      });
    }

    // Suppress warnings for module type detection
    config.ignoreWarnings = [
      { module: /node_modules\/@metamask\/sdk/ },
      { module: /node_modules\/@vanilla-extract/ },
      { module: /node_modules\/@walletconnect/ },
      { module: /node_modules\/@reown/ },
      { module: /node_modules\/viem/ },
    ];

    return config;
  },
  // Transpile packages that need it
  // Note: viem is removed from transpilePackages to avoid import.meta issues
  transpilePackages: ['@rainbow-me/rainbowkit', 'wagmi'],
};

module.exports = nextConfig;

