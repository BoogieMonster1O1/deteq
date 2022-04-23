<script lang="ts">
    import {det, latex, latexVars, adjacent, detLatex, transpose, inverse, multiply} from "../matrix"
    import Katex from "./Katex.svelte";

    let eq: number = 2;
    const max = 5;
    const varNames: string[] = ["x", "y", "z", "w", "v", "u", "t"];
    let coeffs: number[][];
    $: coeffs = new Array(eq)
        .fill(0)
        .map(() =>
            new Array(eq).fill(0)
        );
    let currentVarNames: string[];
    let consts: number[];
    let determinant: number;
    let inv: number[][];
    let result: number[];
    $: currentVarNames = varNames.slice(0, eq);
    $: consts = new Array(eq).fill(0);
    $: determinant = det(coeffs);
    $: inv = inverse(coeffs);
    $: result = multiply(inv, consts);
</script>

<div class="flex flex-col items-center p-3">
    <h1 class="text-5xl">deteq</h1>
    <h2 class="text-3xl">Equation solver that uses Matri ™</h2>
    <a href="https://github.com/BoogieMonster1O1/deteq.git"><h4 class="text-m underline">Source Code</h4></a>
    <br>
    <div class="flex flex-row">
        <h3 class="text-2xl">Variables: </h3>
        <!-- TODO: bump up the max number of variables -->
        <input type="number" class="w-16 text-xl text-center ml-2 border-2" id="equations" bind:value={eq} min=2 max={max}>
    </div>
    <br>
    <h3 class="text-2xl">Coefficients</h3>
    {#each Array.from(Array(eq+1).keys()).slice(1) as i}
        <div class="flex flex-row p-2">
            {#each Array.from(Array(eq+1).keys()).slice(1) as j}
                <input type="text" class="w-[2rem] mt-1 border-2 text-center" bind:value={coeffs[i - 1][j - 1]}>
                <span class="text-2xl">{varNames[j - 1]}
                    {#if j < eq}
                        <span class="text-xl"> +</span>
                    {:else}
                        <span class="text-xl"> =</span>
                    {/if}
                </span>
            {/each}
            <input type="text" class="w-[2rem] mt-1 border-2 text-center" bind:value={consts[i - 1]}>
        </div>
    {/each}
    <br>
    <div class="relative flex py-5 items-center w-full">
        <div class="flex-grow border-t border-gray-400"></div>
    </div>
    <br>
    <h3 class="text-4xl">Solution</h3>
    <br>
    {#if determinant === 0}
        <h3 class="text-2xl text-red-500">Concern. No definite solution to the above system of equations (Zero/Infinite solutions)</h3>
    {:else}
        <div class="p5"><Katex math="{latex(coeffs)} \cdot {latexVars(currentVarNames)} = {latexVars(consts)}"/></div>
        <br>
        <div class="p5"><Katex math="{latexVars(currentVarNames)} = &#123;&#123;&#123;{latex(adjacent(coeffs))}&#125;^&#123;\prime&#125;&#125;\over&#123;{detLatex(coeffs)}&#125;&#125;&#123; \cdot {latexVars(consts)}&#125;"/></div>
        <br>
        <div class="p5"><Katex math="{latexVars(currentVarNames)} = &#123;&#123;&#123;{latex(transpose(adjacent(coeffs)))}&#125;&#125;\over&#123;{det(coeffs)}&#125;&#125;&#123; \cdot {latexVars(consts)}&#125;"/></div>
        <br>
        <div class="p5"><Katex math="{latexVars(currentVarNames)} = {latex(inv)} \cdot {latexVars(consts)}"/></div>
        <br>
        <div class="p5"><Katex math="{latexVars(currentVarNames)} = {latexVars(result)}"/></div>
    {/if}
    <br><br>
    <h6 class="text-xs">Copyright © Shrish Deshpande</h6>
</div>
