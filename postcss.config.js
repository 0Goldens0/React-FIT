export default {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        '>0.2%',
        'not dead',
        'not op_mini all',
        'iOS >= 10',
        'Safari >= 10',
        'Chrome >= 60',
        'Firefox >= 60',
        'Edge >= 79',
        'Samsung >= 8'
      ],
      grid: 'autoplace',
      flexbox: 'no-2009'
    }
  }
}


