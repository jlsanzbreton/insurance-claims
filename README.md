# flood-claim-helper

## Overview
Web application to help flood victims process insurance claims efficiently by leveraging AI for damage assessment.

## Version Control Structure
```
main (protected)
├── development
│   ├── feature/damage-assessment
│   ├── feature/pdf-generation
│   └── feature/email-system
└── releases
    ├── v0.1.0-beta
    ├── v0.2.0-beta
    └── v1.0.0
```

### Branch Protection Rules
1. `main`: Protected branch
   - Requires pull request reviews
   - No direct pushes
   - Must pass CI/CD checks

2. `development`: Main development branch
   - Feature branches merge here first
   - Automated testing required

### Version Numbering (SemVer)
- v0.1.0-beta: Initial beta release
- v0.2.0-beta: Enhanced features
- v1.0.0: First stable release

## Getting Started
1. Clone the repository
2. Copy `.env.example` to `.env.local`
3. Install dependencies: `npm install`
4. Run development server: `npm run dev`

## Development Workflow
1. Create feature branch from `development`
2. Implement feature
3. Create PR to `development`
4. After testing, merge to `development`
5. Create release branch for stable versions

## Beta Testing Program
- Submit feedback via GitHub Issues
- Use the "Beta Feedback" template
- Include screenshots when possible

## Roadmap
- [ ] Basic claim submission
- [ ] AI damage assessment
- [ ] PDF report generation
- [ ] Email notifications
- [ ] GPT model fine-tuning

## Contributing
See CONTRIBUTING.md for guidelines