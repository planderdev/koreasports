# Token migration

| Previous | Replacement | Reason | Consumers |
|---|---|---|---|
| `--semantic-background-normal` | `var(--semantic-background-normal-normal)` | Official semantic role name | assets\css\design-system-docs.css |
| `--semantic-background-alternative` | `var(--semantic-background-normal-alternative)` | Official semantic role name | assets\css\design-system-docs.css |
| `--semantic-background-elevated` | `var(--semantic-background-elevated-normal)` | Official semantic role name | assets\css\design-system-docs.css |
| `--semantic-background-transparent` | `var(--semantic-background-transparent-normal)` | Official semantic role name |  |
| `--semantic-line-normal` | `var(--semantic-line-normal-normal)` | Official semantic role name | assets\css\design-system-docs.css |
| `--semantic-line-neutral` | `var(--semantic-line-normal-neutral)` | Official semantic role name |  |
| `--semantic-line-alternative` | `var(--semantic-line-normal-alternative)` | Official semantic role name |  |
| `--semantic-accent-red` | `var(--semantic-accent-foreground-red)` | Official accent foreground | assets\css\design-system-docs.css |
| `--semantic-accent-red-subtle` | `var(--semantic-background-status-negative)` | Status surface role | assets\css\design-system-docs.css |
| `--semantic-accent-orange` | `var(--semantic-accent-foreground-orange)` | Official accent foreground |  |
| `--semantic-accent-orange-subtle` | `var(--semantic-background-status-cautionary)` | Status surface role |  |
| `--semantic-accent-yellow` | `var(--semantic-accent-foreground-orange)` | Official accent foreground | assets\css\design-system-docs.css |
| `--semantic-accent-yellow-subtle` | `var(--semantic-background-status-cautionary)` | Status surface role | assets\css\design-system-docs.css |
| `--semantic-accent-lime` | `var(--semantic-accent-foreground-lime)` | Official accent foreground |  |
| `--semantic-accent-lime-subtle` | `var(--semantic-surface-lime)` | Status surface role |  |
| `--semantic-accent-green` | `var(--semantic-accent-foreground-green)` | Official accent foreground | assets\css\design-system-docs.css |
| `--semantic-accent-green-subtle` | `var(--semantic-background-status-positive)` | Status surface role | assets\css\design-system-docs.css |
| `--semantic-accent-cyan` | `var(--semantic-accent-foreground-cyan)` | Official accent foreground |  |
| `--semantic-accent-cyan-subtle` | `var(--semantic-surface-cyan)` | Status surface role |  |
| `--semantic-accent-blue` | `var(--semantic-accent-foreground-blue)` | Official accent foreground | assets\css\design-system-docs.css |
| `--semantic-accent-blue-subtle` | `var(--semantic-surface-blue)` | Status surface role | assets\css\design-system-docs.css |
| `--semantic-accent-violet` | `var(--semantic-accent-foreground-violet)` | Official accent foreground |  |
| `--semantic-accent-violet-subtle` | `var(--semantic-surface-violet)` | Status surface role |  |
| `--semantic-accent-pink` | `var(--semantic-accent-foreground-pink)` | Official accent foreground |  |
| `--semantic-accent-pink-subtle` | `var(--semantic-surface-pink)` | Status surface role |  |
| `--elevation-normal-xs` | `var(--semantic-elevation-shadow-normal-xsmall)` | Official elevation | assets\css\design-system-docs.css |
| `--elevation-normal-sm` | `var(--semantic-elevation-shadow-normal-small)` | Official elevation |  |
| `--elevation-normal-md` | `var(--semantic-elevation-shadow-normal-medium)` | Official elevation | assets\css\design-system-docs.css |
| `--elevation-normal-lg` | `var(--semantic-elevation-shadow-normal-large)` | Official elevation | assets\css\design-system-docs.css, assets\css\header.css |
| `--elevation-normal-xl` | `var(--semantic-elevation-shadow-normal-xlarge)` | Official elevation |  |
| `--elevation-spread-xs` | `var(--semantic-elevation-shadow-spread-small)` | Official spread has Small and Medium only; project demo consolidated |  |
| `--elevation-spread-sm` | `var(--semantic-elevation-shadow-spread-small)` | Official spread has Small and Medium only; project demo consolidated |  |
| `--elevation-spread-md` | `var(--semantic-elevation-shadow-spread-medium)` | Official spread has Small and Medium only; project demo consolidated |  |
| `--elevation-spread-lg` | `var(--semantic-elevation-shadow-spread-medium)` | Official spread has Small and Medium only; project demo consolidated | assets\css\base.css |
| `--elevation-spread-xl` | `var(--semantic-elevation-shadow-spread-medium)` | Official spread has Small and Medium only; project demo consolidated |  |
| `--elevation-normal-none` | `none` | No shadow is a CSS keyword |  |
| `--elevation-spread-none` | `none` | No shadow is a CSS keyword |  |
| `--color-primary` | `var(--semantic-primary-normal)` | Remove compatibility alias; consume semantic role | assets\css\admin-editor.css, assets\css\admin.css, assets\css\base.css, assets\css\components.css, assets\css\design-system.css, assets\css\footer.css, assets\css\header.css, assets\css\layout.css, assets\css\moments.css, assets\css\pages.css |
| `--color-primary-dark` | `var(--semantic-primary-heavy)` | Remove compatibility alias; consume semantic role | assets\css\admin.css, assets\css\base.css, assets\css\components.css, assets\css\footer.css, assets\css\layout.css, assets\css\moments.css, assets\css\pages.css |
| `--color-primary-light` | `var(--semantic-brand-subtle)` | Remove compatibility alias; consume semantic role | assets\css\admin.css, assets\css\components.css, assets\css\design-system.css, assets\css\header.css, assets\css\moments.css, assets\css\pages.css |
| `--color-text` | `var(--semantic-label-normal)` | Remove compatibility alias; consume semantic role | assets\css\admin-editor.css, assets\css\admin.css, assets\css\base.css, assets\css\components.css, assets\css\controls.css, assets\css\design-system.css, assets\css\footer.css, assets\css\header.css, assets\css\layout.css, assets\css\moments.css, assets\css\pages.css |
| `--color-text-secondary` | `var(--semantic-label-alternative)` | Remove compatibility alias; consume semantic role | assets\css\admin-editor.css, assets\css\admin.css, assets\css\base.css, assets\css\components.css, assets\css\controls.css, assets\css\design-system.css, assets\css\footer.css, assets\css\header.css, assets\css\layout.css, assets\css\moments.css, assets\css\pages.css |
| `--color-border` | `var(--semantic-line-solid-normal)` | Remove compatibility alias; consume semantic role | assets\css\admin-editor.css, assets\css\admin.css, assets\css\base.css, assets\css\components.css, assets\css\design-system.css, assets\css\footer.css, assets\css\header.css, assets\css\layout.css, assets\css\moments.css, assets\css\pages.css |
| `--color-background` | `var(--semantic-background-normal-normal)` | Remove compatibility alias; consume semantic role | assets\css\admin-editor.css, assets\css\admin.css, assets\css\footer.css, assets\css\header.css, assets\css\moments.css |
| `--color-surface` | `var(--semantic-background-normal-alternative)` | Remove compatibility alias; consume semantic role | assets\css\admin-editor.css, assets\css\admin.css, assets\css\components.css, assets\css\design-system.css, assets\css\footer.css, assets\css\header.css, assets\css\layout.css, assets\css\pages.css |
| `--color-error` | `var(--semantic-status-negative)` | Remove compatibility alias; consume semantic role | assets\css\base.css, assets\css\components.css |
| `--color-warning` | `var(--semantic-status-cautionary)` | Remove compatibility alias; consume semantic role | assets\css\components.css |
| `--color-info` | `var(--semantic-status-info)` | Remove compatibility alias; consume semantic role |  |
| `--color-accent` | `var(--semantic-brand-accent)` | Remove compatibility alias; consume semantic role | assets\css\base.css, assets\css\components.css, assets\css\layout.css, assets\css\moments.css |
| `--shadow-sm` | `var(--semantic-elevation-shadow-normal-small)` | Remove compatibility alias; consume semantic role | assets\css\layout.css |
| `--shadow-md` | `var(--semantic-elevation-shadow-normal-medium)` | Remove compatibility alias; consume semantic role | assets\css\base.css, assets\css\components.css |
| `--font-size-14` | `var(--type-label-1-size)` | Official typography |  |
| `--font-size-16` | `var(--type-body-1-size)` | Official typography |  |
| `--font-size-20` | `var(--type-heading-2-size)` | Official typography |  |
| `--atomic-neutral-0` | `var(--semantic-background-normal-normal)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin.css, assets\css\base.css, assets\css\components.css, assets\css\design-system.css, assets\css\header.css, assets\css\layout.css, assets\css\moments.css, assets\css\pages.css |
| `--atomic-neutral-5` | `var(--semantic-background-normal-alternative)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-neutral-10` | `var(--semantic-background-normal-alternative)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-neutral-20` | `var(--semantic-background-normal-alternative)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-neutral-30` | `var(--semantic-line-solid-normal)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-neutral-40` | `var(--semantic-label-alternative)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-neutral-50` | `var(--semantic-label-alternative)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-neutral-60` | `var(--semantic-label-alternative)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-neutral-70` | `var(--semantic-label-normal)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-neutral-80` | `var(--semantic-label-normal)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-neutral-90` | `var(--semantic-label-normal)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-neutral-100` | `var(--semantic-label-normal)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-green-0` | `var(--semantic-background-status-positive)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-green-5` | `var(--semantic-background-status-positive)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\design-system-docs.css |
| `--atomic-green-10` | `var(--semantic-background-status-positive)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-green-20` | `var(--semantic-background-status-positive)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-green-30` | `var(--semantic-background-status-positive)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-green-40` | `var(--semantic-accent-foreground-green)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-green-50` | `var(--semantic-accent-foreground-green)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\design-system-docs.css |
| `--atomic-green-60` | `var(--semantic-accent-foreground-green)` | Application colors consume semantic roles; official atomic catalog is separate | assets\js\design-system\foundations.js |
| `--atomic-green-70` | `var(--semantic-accent-foreground-green)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-green-80` | `var(--semantic-accent-foreground-green)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-green-90` | `var(--semantic-accent-foreground-green)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-green-100` | `var(--semantic-accent-foreground-green)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-blue-0` | `var(--semantic-surface-blue)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-blue-5` | `var(--semantic-surface-blue)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-blue-10` | `var(--semantic-surface-blue)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-blue-20` | `var(--semantic-surface-blue)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-blue-30` | `var(--semantic-surface-blue)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-blue-40` | `var(--semantic-accent-foreground-blue)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-blue-50` | `var(--semantic-accent-foreground-blue)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-blue-60` | `var(--semantic-accent-foreground-blue)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-blue-70` | `var(--semantic-accent-foreground-blue)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-blue-80` | `var(--semantic-accent-foreground-blue)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-blue-90` | `var(--semantic-accent-foreground-blue)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-blue-100` | `var(--semantic-accent-foreground-blue)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-red-0` | `var(--semantic-background-status-negative)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-red-5` | `var(--semantic-background-status-negative)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-red-10` | `var(--semantic-background-status-negative)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css, assets\css\components.css |
| `--atomic-red-20` | `var(--semantic-background-status-negative)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-red-30` | `var(--semantic-background-status-negative)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-red-40` | `var(--semantic-accent-foreground-red)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-red-50` | `var(--semantic-accent-foreground-red)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-red-60` | `var(--semantic-accent-foreground-red)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-red-70` | `var(--semantic-accent-foreground-red)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-red-80` | `var(--semantic-accent-foreground-red)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-red-90` | `var(--semantic-accent-foreground-red)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-red-100` | `var(--semantic-accent-foreground-red)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-orange-0` | `var(--semantic-background-status-cautionary)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-orange-5` | `var(--semantic-background-status-cautionary)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-orange-10` | `var(--semantic-background-status-cautionary)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-orange-20` | `var(--semantic-background-status-cautionary)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-orange-30` | `var(--semantic-background-status-cautionary)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-orange-40` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-orange-50` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-orange-60` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-orange-70` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-orange-80` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-orange-90` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-orange-100` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-yellow-0` | `var(--semantic-background-status-cautionary)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-yellow-5` | `var(--semantic-background-status-cautionary)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-yellow-10` | `var(--semantic-background-status-cautionary)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-yellow-20` | `var(--semantic-background-status-cautionary)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-yellow-30` | `var(--semantic-background-status-cautionary)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-yellow-40` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-yellow-50` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-yellow-60` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-yellow-70` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-yellow-80` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-yellow-90` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-yellow-100` | `var(--semantic-accent-foreground-orange)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-lime-0` | `var(--semantic-surface-lime)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-lime-5` | `var(--semantic-surface-lime)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-lime-10` | `var(--semantic-surface-lime)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-lime-20` | `var(--semantic-surface-lime)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-lime-30` | `var(--semantic-surface-lime)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-lime-40` | `var(--semantic-accent-foreground-lime)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-lime-50` | `var(--semantic-accent-foreground-lime)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-lime-60` | `var(--semantic-accent-foreground-lime)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-lime-70` | `var(--semantic-accent-foreground-lime)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-lime-80` | `var(--semantic-accent-foreground-lime)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-lime-90` | `var(--semantic-accent-foreground-lime)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-lime-100` | `var(--semantic-accent-foreground-lime)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-cyan-0` | `var(--semantic-surface-cyan)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-cyan-5` | `var(--semantic-surface-cyan)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-cyan-10` | `var(--semantic-surface-cyan)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-cyan-20` | `var(--semantic-surface-cyan)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-cyan-30` | `var(--semantic-surface-cyan)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-cyan-40` | `var(--semantic-accent-foreground-cyan)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-cyan-50` | `var(--semantic-accent-foreground-cyan)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-cyan-60` | `var(--semantic-accent-foreground-cyan)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-cyan-70` | `var(--semantic-accent-foreground-cyan)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-cyan-80` | `var(--semantic-accent-foreground-cyan)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-cyan-90` | `var(--semantic-accent-foreground-cyan)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-cyan-100` | `var(--semantic-accent-foreground-cyan)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-violet-0` | `var(--semantic-surface-violet)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-violet-5` | `var(--semantic-surface-violet)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-violet-10` | `var(--semantic-surface-violet)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-violet-20` | `var(--semantic-surface-violet)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-violet-30` | `var(--semantic-surface-violet)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-violet-40` | `var(--semantic-accent-foreground-violet)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-violet-50` | `var(--semantic-accent-foreground-violet)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-violet-60` | `var(--semantic-accent-foreground-violet)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-violet-70` | `var(--semantic-accent-foreground-violet)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-violet-80` | `var(--semantic-accent-foreground-violet)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-violet-90` | `var(--semantic-accent-foreground-violet)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-violet-100` | `var(--semantic-accent-foreground-violet)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-pink-0` | `var(--semantic-surface-pink)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-pink-5` | `var(--semantic-surface-pink)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-pink-10` | `var(--semantic-surface-pink)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-pink-20` | `var(--semantic-surface-pink)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-pink-30` | `var(--semantic-surface-pink)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-pink-40` | `var(--semantic-accent-foreground-pink)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-pink-50` | `var(--semantic-accent-foreground-pink)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-pink-60` | `var(--semantic-accent-foreground-pink)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-pink-70` | `var(--semantic-accent-foreground-pink)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-pink-80` | `var(--semantic-accent-foreground-pink)` | Application colors consume semantic roles; official atomic catalog is separate | assets\css\admin-editor.css |
| `--atomic-pink-90` | `var(--semantic-accent-foreground-pink)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--atomic-pink-100` | `var(--semantic-accent-foreground-pink)` | Application colors consume semantic roles; official atomic catalog is separate |  |
| `--color-f7f8f6` | `var(--semantic-background-normal-alternative)` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css |
| `--color-f1f3ef` | `var(--semantic-background-normal-alternative)` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css |
| `--color-e2e7df` | `var(--semantic-line-solid-neutral)` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css |
| `--color-00000000` | `transparent` | Official role or project-local literal; no global literal harvesting | assets\css\base.css, assets\css\components.css, assets\css\design-system-docs.css, assets\css\layout.css, assets\css\pages.css |
| `--color-0e2019a8` | `var(--semantic-material-dimmer)` | Official role or project-local literal; no global literal harvesting | assets\css\base.css |
| `--color-e5b2ad` | `var(--semantic-line-status-negative-normal)` | Official role or project-local literal; no global literal harvesting | assets\css\components.css |
| `--color-f0f1ee` | `var(--semantic-background-normal-alternative)` | Official role or project-local literal; no global literal harvesting | assets\css\components.css |
| `--color-616a62` | `var(--semantic-label-alternative)` | Official role or project-local literal; no global literal harvesting | assets\css\components.css |
| `--color-fff4d8` | `var(--semantic-background-status-cautionary)` | Official role or project-local literal; no global literal harvesting | assets\css\components.css |
| `--color-8a938b` | `var(--semantic-label-alternative)` | Official role or project-local literal; no global literal harvesting | assets\css\components.css |
| `--color-fff7e6` | `var(--semantic-background-status-cautionary)` | Official role or project-local literal; no global literal harvesting | assets\css\components.css |
| `--color-edf0ec` | `var(--semantic-line-solid-neutral)` | Official role or project-local literal; no global literal harvesting | assets\css\components.css |
| `--color-f0f2ef` | `var(--semantic-line-solid-neutral)` | Official role or project-local literal; no global literal harvesting | assets\css\header.css |
| `--color-edf0ed` | `var(--semantic-line-solid-neutral)` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--color-f8f9f7` | `var(--semantic-background-normal-alternative)` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--color-eef0ec` | `var(--semantic-line-solid-neutral)` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--color-596159` | `var(--semantic-label-alternative)` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--color-acb7a9` | `var(--semantic-line-solid-neutral)` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--color-0a2218c7` | `#0a2218c7` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--color-0a221885` | `#0a221885` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--color-0a221808` | `#0a221808` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--color-e2eacf` | `#e2eacf` | Official role or project-local literal; no global literal harvesting |  |
| `--color-e1e8de` | `#e1e8de` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--color-ffffff21` | `#ffffff21` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--color-ffffff50` | `#ffffff50` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--color-dfebd4` | `#dfebd4` | Official role or project-local literal; no global literal harvesting |  |
| `--color-90998f` | `var(--semantic-label-alternative)` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--color-051c12c9` | `#051c12c9` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--color-e4ebdf` | `#e4ebdf` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--color-c4d6c8` | `#c4d6c8` | Official role or project-local literal; no global literal harvesting |  |
| `--color-ffffff35` | `#ffffff35` | Official role or project-local literal; no global literal harvesting |  |
| `--color-c5d4c4` | `var(--semantic-line-solid-neutral)` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--color-092617b8` | `#092617b8` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--color-09261738` | `#09261738` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-230px` | `230px` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css, assets\css\header.css |
| `--space-30px` | `30px` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css, assets\css\components.css, assets\css\design-system.css, assets\css\layout.css, assets\css\pages.css |
| `--space-1px` | `1px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--space-36px` | `36px` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css, assets\css\design-system-docs.css, assets\css\design-system.css, assets\css\layout.css, assets\css\pages.css |
| `--size-110px` | `110px` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css, assets\css\design-system-docs.css |
| `--size-44px` | `44px` | Official role or project-local literal; no global literal harvesting | assets\css\admin-editor.css, assets\css\admin.css, assets\css\components.css, assets\css\design-system-docs.css, assets\css\design-system.css, assets\css\footer.css, assets\css\header.css, assets\css\layout.css, assets\css\pages.css |
| `--size-180px` | `180px` | Official role or project-local literal; no global literal harvesting | assets\css\admin-editor.css, assets\css\admin.css, assets\css\components.css, assets\css\pages.css |
| `--size-280px` | `280px` | Official role or project-local literal; no global literal harvesting | assets\css\admin-editor.css, assets\css\admin.css, assets\js\design-system\components.js |
| `--space-160px` | `160px` | Official role or project-local literal; no global literal harvesting | assets\css\base.css |
| `--size-1px` | `1px` | Official role or project-local literal; no global literal harvesting | assets\css\base.css, assets\css\components.css, assets\css\design-system-docs.css, assets\css\layout.css |
| `--space-minus-100px` | `-100px` | Official role or project-local literal; no global literal harvesting | assets\css\base.css |
| `--size-620px` | `620px` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css, assets\css\base.css, assets\css\design-system-docs.css |
| `--size-32px` | `32px` | Official role or project-local literal; no global literal harvesting | assets\css\base.css, assets\css\components.css, assets\css\design-system-docs.css, assets\css\pages.css |
| `--size-22px` | `22px` | Official role or project-local literal; no global literal harvesting | assets\css\base.css |
| `--size-48px` | `48px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\design-system-docs.css, assets\css\header.css |
| `--space-23px` | `23px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\pages.css |
| `--space-17px` | `17px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\pages.css |
| `--space-5px` | `5px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\layout.css, assets\css\pages.css |
| `--space-9px` | `9px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\design-system-docs.css, assets\css\layout.css |
| `--space-22px` | `22px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\footer.css, assets\css\pages.css |
| `--space-26px` | `26px` | Official role or project-local literal; no global literal harvesting | assets\css\footer.css, assets\css\layout.css, assets\css\pages.css |
| `--space-18px` | `18px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\design-system-docs.css, assets\css\footer.css, assets\css\header.css, assets\css\layout.css, assets\css\pages.css |
| `--space-14px` | `14px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\design-system-docs.css, assets\css\design-system.css, assets\css\footer.css, assets\css\header.css, assets\css\layout.css, assets\css\pages.css |
| `--size-120px` | `120px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\controls.css, assets\css\design-system-docs.css |
| `--size-18px` | `18px` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css, assets\css\components.css, assets\css\design-system-docs.css |
| `--space-7px` | `7px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\design-system-docs.css |
| `--space-42px` | `42px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css |
| `--size-480px` | `480px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\design-system-docs.css |
| `--size-28px` | `28px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\design-system-docs.css, assets\css\header.css |
| `--size-20px` | `20px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\design-system-docs.css |
| `--space-100px` | `100px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\design-system-docs.css |
| `--size-6px` | `6px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css |
| `--size-12px` | `12px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\layout.css |
| `--size-24px` | `24px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\design-system-docs.css, assets\css\header.css |
| `--size-90px` | `90px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\design-system.css |
| `--size-1300px` | `1300px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css |
| `--size-210px` | `210px` | Official role or project-local literal; no global literal harvesting | assets\css\controls.css |
| `--size-72px` | `72px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\design-system.css, assets\css\header.css |
| `--size-40px` | `40px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\header.css, assets\css\layout.css |
| `--size-200px` | `200px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\header.css |
| `--size-1700px` | `1700px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--space-73px` | `73px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-73px` | `73px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-36px` | `36px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\header.css, assets\css\layout.css |
| `--size-750px` | `750px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-170px` | `170px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\design-system.css |
| `--size-56px` | `56px` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css, assets\css\design-system-docs.css |
| `--space-3px` | `3px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\layout.css |
| `--size-60px` | `60px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-52px` | `52px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\footer.css, assets\css\pages.css |
| `--size-150px` | `150px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-130px` | `130px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-16px` | `16px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\design-system.css, assets\css\pages.css |
| `--size-84px` | `84px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\layout.css, assets\css\pages.css |
| `--size-100px` | `100px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-450px` | `450px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-26px` | `26px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-140px` | `140px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--space-minus-10px` | `-10px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-360px` | `360px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\pages.css |
| `--size-500px` | `500px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\pages.css |
| `--space-minus-3px` | `-3px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-160px` | `160px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-8px` | `8px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-300px` | `300px` | Official role or project-local literal; no global literal harvesting | assets\css\admin-editor.css, assets\css\design-system-docs.css, assets\css\moments.css, assets\css\pages.css |
| `--size-220px` | `220px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\header.css, assets\css\pages.css |
| `--size-260px` | `260px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\header.css, assets\css\pages.css |
| `--size-135px` | `135px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--size-80px` | `80px` | Official role or project-local literal; no global literal harvesting | assets\css\admin-editor.css, assets\css\design-system-docs.css, assets\css\pages.css, assets\js\pages\catalog.js |
| `--size-250px` | `250px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\pages.css |
| `--size-75px` | `75px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\pages.css |
| `--size-76px` | `76px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system.css |
| `--size-240px` | `240px` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css, assets\css\design-system.css, assets\css\footer.css |
| `--size-1500px` | `1500px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system.css |
| `--space-60px` | `60px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system.css, assets\css\pages.css |
| `--size-680px` | `680px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system.css |
| `--size-4px` | `4px` | Official role or project-local literal; no global literal harvesting | assets\css\footer.css |
| `--size-5px` | `5px` | Official role or project-local literal; no global literal harvesting |  |
| `--space-44px` | `44px` | Official role or project-local literal; no global literal harvesting | assets\css\footer.css, assets\css\layout.css, assets\css\pages.css |
| `--size-96px` | `96px` | Official role or project-local literal; no global literal harvesting | assets\css\header.css, assets\css\layout.css, assets\css\pages.css |
| `--space-minus-8px` | `-8px` | Official role or project-local literal; no global literal harvesting | assets\css\header.css |
| `--size-46px` | `46px` | Official role or project-local literal; no global literal harvesting | assets\css\header.css |
| `--size-169px` | `var(--layout-header-desktop)` | Official role or project-local literal; no global literal harvesting | assets\css\header.css |
| `--space-185px` | `calc(var(--layout-header-desktop) + var(--space-16))` | Official role or project-local literal; no global literal harvesting | assets\css\header.css |
| `--space-193px` | `calc(var(--layout-header-desktop) + var(--space-24))` | Official role or project-local literal; no global literal harvesting | assets\css\header.css |
| `--size-78px` | `78px` | Official role or project-local literal; no global literal harvesting | assets\css\header.css |
| `--space-88px` | `88px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--size-7px` | `7px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--space-minus-7px` | `-7px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--space-minus-4px` | `-4px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--size-57px` | `57px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--space-54px` | `54px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--size-3px` | `3px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--space-25px` | `25px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css, assets\css\pages.css |
| `--space-15px` | `15px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css, assets\css\pages.css |
| `--space-74px` | `74px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css, assets\css\pages.css |
| `--size-37px` | `37px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--space-46px` | `46px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--space-90px` | `90px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--size-720px` | `720px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--size-64px` | `64px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--size-74px` | `74px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--space-35px` | `35px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--space-38px` | `38px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--size-540px` | `540px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--space-86px` | `86px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-25px` | `25px` | Official role or project-local literal; no global literal harvesting |  |
| `--size-50px` | `50px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--space-34px` | `34px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-2px` | `2px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-54px` | `54px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--space-58px` | `58px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--space-55px` | `55px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-320px` | `320px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--space-62px` | `62px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-350px` | `350px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--space-166px` | `166px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-70px` | `70px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-650px` | `650px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-700px` | `700px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-440px` | `440px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--space-minus-12px` | `-12px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--space-minus-35px` | `-35px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-68px` | `68px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--space-72px` | `72px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-490px` | `490px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--space-66px` | `66px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-275px` | `275px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-270px` | `270px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--size-290px` | `290px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--gallery-card-width` | `460px` | Official role or project-local literal; no global literal harvesting | assets\css\moments.css |
| `--gallery-portrait` | `112px` | Official role or project-local literal; no global literal harvesting | assets\css\moments.css |
| `--font-weight-650` | `var(--font-weight-semibold)` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css, assets\css\components.css, assets\css\design-system-docs.css, assets\css\design-system.css, assets\css\footer.css, assets\css\header.css, assets\css\layout.css, assets\css\pages.css |
| `--font-size-19px` | `var(--type-headline-1-size)` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css, assets\css\header.css |
| `--font-size-30px` | `var(--type-title-1-size)` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css, assets\css\footer.css, assets\css\pages.css |
| `--font-size-26px` | `var(--type-title-3-size)` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css, assets\css\design-system.css, assets\css\layout.css, assets\css\pages.css |
| `--font-family-pretendard-noto-sans-kr-systemminus-ui-sansminus-serif` | `var(--font-family)` | Official role or project-local literal; no global literal harvesting | assets\css\base.css |
| `--line-height-1p6` | `1.6` | Official role or project-local literal; no global literal harvesting | assets\css\base.css |
| `--line-height-1p35` | `1.35` | Official role or project-local literal; no global literal harvesting | assets\css\base.css |
| `--tracking-minus-p035em` | `-.035em` | Official role or project-local literal; no global literal harvesting | assets\css\base.css |
| `--font-size-48px` | `var(--type-display-1-size)` | Official role or project-local literal; no global literal harvesting | assets\css\base.css |
| `--font-weight-750` | `var(--font-weight-bold)` | Official role or project-local literal; no global literal harvesting | assets\css\base.css, assets\css\footer.css, assets\css\layout.css |
| `--line-height-1p4` | `1.4` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\design-system.css, assets\css\footer.css, assets\css\pages.css |
| `--line-height-1p5` | `1.5` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\header.css, assets\css\pages.css |
| `--font-size-21px` | `var(--type-heading-1-size)` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\header.css, assets\css\pages.css |
| `--tracking-1p5px` | `1.5px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--line-height-52px` | `52px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--tracking-minus-p0282em` | `-.0282em` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--line-height-26px` | `26px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--line-height-32px` | `32px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--tracking-minus-p023em` | `-.023em` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--line-height-24px` | `24px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--line-height-48px` | `48px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--line-height-21px` | `21px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--line-height-23px` | `23px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--font-family-consolas-monospace` | `var(--font-family-mono)` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--line-height-1p8` | `1.8` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\design-system.css, assets\css\footer.css, assets\css\pages.css |
| `--line-height-16px` | `16px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--line-height-22px` | `22px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--line-height-20px` | `20px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--line-height-18px` | `18px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--line-height-42px` | `42px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--tracking-2px` | `2px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system.css |
| `--font-size-44px` | `var(--type-display-2-size)` | Official role or project-local literal; no global literal harvesting | assets\css\design-system.css, assets\css\pages.css |
| `--line-height-1p3` | `1.3` | Official role or project-local literal; no global literal harvesting | assets\css\base.css, assets\css\design-system.css |
| `--tracking-1p6px` | `1.6px` | Official role or project-local literal; no global literal harvesting | assets\css\design-system.css |
| `--line-height-1p45` | `1.45` | Official role or project-local literal; no global literal harvesting | assets\css\design-system.css |
| `--tracking-minus-p04em` | `-.04em` | Official role or project-local literal; no global literal harvesting | assets\css\footer.css |
| `--font-size-25px` | `var(--type-title-3-size)` | Official role or project-local literal; no global literal harvesting | assets\css\footer.css, assets\css\header.css, assets\css\pages.css |
| `--line-height-1p85` | `1.85` | Official role or project-local literal; no global literal harvesting | assets\css\footer.css |
| `--font-size-34px` | `var(--type-title-1-size)` | Official role or project-local literal; no global literal harvesting | assets\css\header.css, assets\css\layout.css, assets\css\pages.css |
| `--line-height-1p55` | `1.55` | Official role or project-local literal; no global literal harvesting | assets\css\header.css |
| `--font-size-27px` | `var(--type-title-2-size)` | Official role or project-local literal; no global literal harvesting | assets\css\header.css |
| `--tracking-p35px` | `.35px` | Official role or project-local literal; no global literal harvesting | assets\css\header.css |
| `--font-size-23px` | `var(--type-title-3-size)` | Official role or project-local literal; no global literal harvesting | assets\css\header.css, assets\css\pages.css |
| `--tracking-p15em` | `.15em` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--tracking-minus-3px` | `-3px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--font-weight-900` | `var(--font-weight-bold)` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css, assets\css\pages.css |
| `--line-height-1p15` | `1.15` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--tracking-minus-p045em` | `-.045em` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--tracking-1p1px` | `1.1px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--tracking-1px` | `1px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css, assets\css\pages.css |
| `--tracking-p6px` | `.6px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--tracking-p18em` | `.18em` | Official role or project-local literal; no global literal harvesting |  |
| `--font-weight-550` | `var(--font-weight-medium)` | Official role or project-local literal; no global literal harvesting |  |
| `--font-size-38px` | `var(--type-display-2-size)` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--font-size-60px` | `var(--type-display-1-size)` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--line-height-1p22` | `1.22` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--tracking-minus-p048em` | `-.048em` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--tracking-p04em` | `.04em` | Official role or project-local literal; no global literal harvesting |  |
| `--font-size-29px` | `var(--type-title-2-size)` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--tracking-p07em` | `.07em` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--line-height-1p9` | `1.9` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--font-size-100px` | `100px` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--font-size-37px` | `var(--type-display-3-size)` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--stroke-1px` | `var(--border-thin)` | Official role or project-local literal; no global literal harvesting | assets\css\admin-editor.css, assets\css\admin.css, assets\css\base.css, assets\css\components.css, assets\css\design-system-docs.css, assets\css\design-system.css, assets\css\footer.css, assets\css\header.css, assets\css\layout.css, assets\css\moments.css, assets\css\pages.css |
| `--stroke-8px` | `8px` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css |
| `--radius-26px` | `26px` | Official role or project-local literal; no global literal harvesting | assets\css\admin.css |
| `--opacity-p45` | `.45` | Official role or project-local literal; no global literal harvesting | assets\css\base.css |
| `--stroke-3px` | `var(--border-focus)` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\pages.css |
| `--stroke-4px` | `4px` | Official role or project-local literal; no global literal harvesting |  |
| `--layer-1000` | `var(--z-tooltip)` | Official role or project-local literal; no global literal harvesting | assets\css\base.css |
| `--radius-9px` | `9px` | Official role or project-local literal; no global literal harvesting | assets\css\components.css |
| `--layer-200` | `var(--z-toast)` | Official role or project-local literal; no global literal harvesting | assets\css\components.css |
| `--stroke-2px` | `var(--border-strong)` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\design-system-docs.css, assets\css\header.css, assets\css\layout.css |
| `--radius-10px` | `var(--radius-10)` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css, assets\css\footer.css, assets\css\header.css |
| `--shadow-0-1px-3px-black` | `0 1px 3px black` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--opacity-p4` | `.4` | Official role or project-local literal; no global literal harvesting | assets\css\base.css, assets\css\design-system.css |
| `--radius-18px` | `18px` | Official role or project-local literal; no global literal harvesting |  |
| `--radius-14px` | `14px` | Official role or project-local literal; no global literal harvesting |  |
| `--layer-50` | `var(--z-sticky)` | Official role or project-local literal; no global literal harvesting | assets\css\header.css, assets\css\layout.css |
| `--layer-5` | `var(--z-dropdown)` | Official role or project-local literal; no global literal harvesting | assets\css\header.css, assets\css\layout.css, assets\css\pages.css |
| `--shadow-0-20px-25px-0001` | `0 20px 25px #0001` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--radius-3px` | `3px` | Official role or project-local literal; no global literal harvesting | assets\css\layout.css |
| `--layer-20` | `var(--z-overlay)` | Official role or project-local literal; no global literal harvesting | assets\css\components.css, assets\css\layout.css |
| `--layer-2` | `var(--z-base)` | Official role or project-local literal; no global literal harvesting | assets\css\admin-editor.css, assets\css\components.css, assets\css\layout.css, assets\css\pages.css |
| `--opacity-p6` | `.6` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--opacity-p8` | `.8` | Official role or project-local literal; no global literal harvesting |  |
| `--opacity-p06` | `.06` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
| `--duration-p2s` | `var(--duration-normal)` | Official role or project-local literal; no global literal harvesting | assets\css\base.css, assets\css\components.css |
| `--duration-p01ms` | `.01ms` | Official role or project-local literal; no global literal harvesting | assets\css\base.css |
| `--duration-p45s` | `.45s` | Official role or project-local literal; no global literal harvesting | assets\css\components.css |
| `--duration-p8s` | `.8s` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--angle-120deg` | `120deg` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--angle-360deg` | `360deg` | Official role or project-local literal; no global literal harvesting | assets\css\design-system-docs.css |
| `--angle-180deg` | `180deg` | Official role or project-local literal; no global literal harvesting | assets\css\header.css |
| `--angle-90deg` | `90deg` | Official role or project-local literal; no global literal harvesting | assets\css\header.css, assets\css\pages.css |
| `--duration-p4s` | `.4s` | Official role or project-local literal; no global literal harvesting | assets\css\pages.css |
