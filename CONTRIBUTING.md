# Contributing to P-A-L

Thanks for your interest in contributing to P-A-L! This document provides guidelines and instructions for contributing.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

### Suggesting Features

Feature suggestions are welcome! Please:
- Check if the feature has already been suggested
- Describe the feature clearly
- Explain the use case and benefits
- Consider implementation complexity

### Submitting Code

1. **Fork the repository**
   ```bash
   git fork https://github.com/yourusername/P-A-L.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Test your changes thoroughly
   - Update documentation if needed

4. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of changes"
   ```

5. **Push and create a pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

## Development Setup

1. Clone the repository
2. Load the extension in your browser (see README.md)
3. Make changes to the code
4. Reload the extension to test changes

## Code Style

- Use 2 spaces for indentation
- Use meaningful variable names
- Add comments for complex logic
- Keep functions focused and small
- Use ES6+ features when appropriate

## Testing

Before submitting:
- Test in Chrome and/or Firefox
- Test with different API providers (OpenAI, local models)
- Verify the sidebar works on various websites
- Check for console errors
- Test the minimize/expand functionality

## Areas for Contribution

Here are some ideas if you want to contribute but aren't sure where to start:

### Features
- Message search/filtering
- Export conversation history
- Keyboard shortcuts
- Dark/light theme toggle
- Multiple personality presets
- Voice input/output
- Notification settings

### Improvements
- Better error handling
- Accessibility improvements (ARIA labels, keyboard navigation)
- Performance optimizations
- Better mobile/responsive design
- Improved typing detection
- Smart conversation summarization

### Documentation
- Video tutorials
- More personality prompt examples
- Troubleshooting guides
- Translation to other languages

### Testing
- Automated testing setup
- Browser compatibility testing
- Performance benchmarking

## Community

- Be respectful and constructive
- Help others in issues and discussions
- Share your custom personality prompts
- Spread the word about P-A-L!

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the "question" label
- Start a discussion
- Reach out to the maintainers

Thank you for contributing to P-A-L!
