<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-about">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{$t('about.title')}}</h4>
                </div>
                <div class="modal-body">

                    <table class="table table-bordered table-striped">
                        <tbody>
                        <tr>
                            <th width="100">{{$t('about.version')}}:</th>
                            <td>1.0.1</td>
                        </tr>
                        <tr>
                            <th>{{$t('about.version_intro_title')}}:</th>
                            <td>
                                {{$t('about.version_intro')}}
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('about.project_intro_title')}}:</th>
                            <td>
                                {{$t('about.project_intro')}}
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('about.github')}}:</th>
                            <td><a nofollow target="_blank" href="https://github.com/gxchain/gxb-explorer">https://github.com/gxchain/gxb-explorer</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <h4>{{$t('about.about_company')}}</h4>
                    <p>{{$t('about.company_intro1')}}</p>
                    <p>{{$t('about.company_intro2')}}</p>
                    <p>{{$t('about.company_intro3')}}</p>

                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>
<script>
    export default {};
</script>
