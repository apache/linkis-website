---
title: Special Logic Overview
sidebar_position: 0
---

# Special Logic Overview

This section documents the special logic implementations in Linkis that are important for developers to understand when contributing to or debugging the project. These are core mechanisms that handle complex scenarios in the Linkis architecture.

## Document List

| Document | Description |
|----------|-------------|
| [Engine Reuse Logic](./engine-reuse-logic.md) | Explains the engine reuse mechanism during engine startup, including matching rules, filtering conditions, and configuration parameters |

## Purpose

Understanding these special logic implementations is crucial for:

1. **Debugging Issues**: When troubleshooting problems related to engine management, task scheduling, or resource allocation
2. **Performance Optimization**: Understanding how these mechanisms work helps in tuning the system for better performance
3. **Feature Development**: When developing new features, understanding existing special logic helps avoid conflicts and ensures proper integration
4. **Code Review**: Reviewers can better evaluate changes that affect these critical code paths

## How to Contribute

If you discover other important special logic in Linkis that should be documented:

1. Create a new markdown file in this directory following the naming convention: `<feature-name>-logic.md`
2. Use the existing documents as templates for structure and format
3. Include:
   - Overview of the logic
   - Core workflow/flowchart
   - Key classes and code locations
   - Configuration parameters
   - Examples if applicable
4. Update this overview page to include your new document
5. Submit a PR following the [contribution guidelines](/community/how-to-contribute)
